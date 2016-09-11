<?php

use Robo\Tasks;
use Rougemine\Resume\ContainerBuilder;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\CS\Console\Command\FixCommand as PHPCSFixCommand;

/**
 * Use these tasks with `php vendor/codegyre/robo/robo` (easier to use with an alias :-).
 *
 * @link http://robo.li/
 */
class RoboFile extends Tasks
{
    const AVAILABLE_LANGUAGES = ['en', 'fr'];

    /**
     * This launches all our tasks, in the right order.
     */
    public function build()
    {
        if (false === getenv('PROD_MODE')) {
            putenv('PROD_MODE=1');//this task is meant to be used for "prod" builds
        }

        $this->npmInstall();
        $this->buildScss();
        $this->assetsInstall();
        $this->buildHtml();
        $this->buildPdf();
    }

    /**
     * We don't use Robo NPM built-in tasks here, as we do want to use the Node.js install we've requested in the "composer.json" file.
     */
    public function npmInstall()
    {
        $npmPath = $this->isWindows()
            ? __DIR__ . '/vendor/nodejs/nodejs/npm'
            : __DIR__ . '/vendor/nodejs/nodejs/bin/npm'
        ;
        $thirdPartyResourcesPackageFilePath = dirname($this->getThirdPartyResourcesDirPath());

        $npmInstallCommand = sprintf('%s install', $npmPath);
        $npmInstallProcess = $this
            ->taskExec($npmInstallCommand)
            ->dir($thirdPartyResourcesPackageFilePath)
            ->run()
        ;

        if (!$npmInstallProcess->wasSuccessful()) {
            throw new RuntimeException('Failed to "npm install"');
        }
    }

    /**
     * We'll never say "Thanks!" enough to Leaf Corcoran for his PHP implementations of LESS and SCSS compilers :-).
     */
    public function buildScss()
    {
        // No way to easily include CSS files content in a SCSS file, too bad :-/
        // --> we have to manually create "underscored-and-scss-ized" versions of third-party CSS assets...
        // @link https://github.com/sass/sass/issues/556#issuecomment-73439666
        $thirdPartyResourcesDirPath = $this->getThirdPartyResourcesDirPath();
        $thirdPartyCssFiles = (new Finder())
            ->files()
            ->name('*.css')
            ->in($thirdPartyResourcesDirPath)
        ;
        /** @var SplFileInfo $cssFile */
        foreach ($thirdPartyCssFiles as $cssFile) {
            $cssFilePath = str_replace('\\', '/', $cssFile->getPathname());
            $underscoredCssFilePath = preg_replace('~/([^/]+)\.css$~', '/_$1.scss', $cssFilePath);
            copy($cssFile, $underscoredCssFilePath);
        }

        $scssDirPath = 'front-end-assets/scss/';
        $this
            ->taskScss([
                "$scssDirPath/main.scss" => 'web/css/main.css',
            ])
            ->importDir($scssDirPath)
            ->run()
        ;

        $this->minifyCss();
    }

    /**
     * Well... That task name should be self-explanatory :-).
     */
    public function minifyCss()
    {
        $this
            ->taskMinify('web/css/main.css')
            ->to('web/css/main.min.css')
            ->run()
        ;
    }

    /**
     * Copies images from "front-end-assets/img" to "web/img".
     */
    public function assetsInstall()
    {
        // Images copy
        $imagesSourceDirPath = __DIR__ . '/front-end-assets/img';
        $imagesTargetDirPath = __DIR__ . '/web/img';

        $this
            ->taskCopyDir([
                $imagesSourceDirPath => $imagesTargetDirPath,
            ])
            ->run()
        ;

        // Let's remove SVG files, as we don't use them...
        $svgFiles = (new Finder())
            ->files()
            ->name('*.svg')
            ->in($imagesTargetDirPath)
        ;
        array_map(
            function (SplFileInfo $fileInfo) {
                unlink($fileInfo->getPathname());
            },
            iterator_to_array($svgFiles)
        );
        
        // Fonts copy
        $fontsSourceDirPath = __DIR__ . '/front-end-assets/js/node_modules/dejavu-sans/fonts';
        $fontsTargetDirPath = __DIR__ . '/web/fonts';

        $this
            ->taskCopyDir([
                $fontsSourceDirPath => $fontsTargetDirPath,
            ])
            ->run()
        ;
    }

    /**
     * Creates HTML files from data and Twig templates, for each language.
     */
    public function buildHtml()
    {
        $twig = $this->getTwig();

        foreach (self::AVAILABLE_LANGUAGES as $language) {
            $viewVars = $this->getContainer()->get('app.view.presenters_generator')->getViewVarsPresenters($language);
            $this->generateHtmlPage($twig, $language, $viewVars);
        }
    }

    /**
     * Useful for development.
     */
    public function watch()
    {
        putenv('PROD_MODE=0');//this task is meant to be used for "dev" builds

        $this->build();

        $this
            ->taskWatch()
            ->monitor('front-end-assets/scss', function () {
                $this->say('SCSS files modified. CSS compilation...');
                $startTime = microtime(true);
                $this->buildScss();
                $this->say(sprintf('CSS compilation done. (%ss.)', round(microtime(true) - $startTime, 3)));
            })->monitor('src', function () {
                $this->say('PHP/YAML files modified. HTML compilation...');
                // We could have triggered `$this->buildHtml()`, but we have Twig cache issues...
                // --> let's ask Robo to trigger a new Robo task! (oh, this is so meta)
                $this->_exec('php vendor/codegyre/robo/robo build:html');
            })
            ->run()
        ;
    }

    /**
     * Builds PDF files from HTML files, thanks to "wkhtmltopdf".
     */
    public function buildPdf()
    {
        if (false === $wkhtmltopdfPath = getenv('WKHTML_TO_PDF_PATH')) {
            if ($this->isWindows()) {
                $wkhtmltopdfPath = __DIR__ . '/vendor/wemersonjanuario/wkhtmltopdf-windows/bin/64bit/wkhtmltopdf.exe';
            } else {
                $wkhtmltopdfPath = __DIR__ . '/vendor/h4cc/wkhtmltopdf-amd64/bin/wkhtmltopdf-amd64';
            }
        }

        foreach (self::AVAILABLE_LANGUAGES as $language) {
            $sourceFilePath = sprintf('web/index.%s.html', $language);
            $targetFilePath = sprintf('web/cv-olivier-philippon.%s.pdf', $language);
            $wkhtmltopdfCommand = vsprintf('%s --print-media-type %s %s', [
                $wkhtmltopdfPath,
                $sourceFilePath,
                $targetFilePath,
            ]);
            $wkhtmltopdfProcess = $this
                ->taskExec($wkhtmltopdfCommand)
                ->run()
            ;

            if (!$wkhtmltopdfProcess->wasSuccessful()) {
                throw new RuntimeException('Failed to "wkhtmltopdf"');
            } else {
                $this->say(sprintf('"%s" PDF file built.', $language));
            }
        }
    }

    /**
     * Starts PHP built-in HTTP server.
     */
    public function serverStart()
    {
        if (false === $port = getenv('RESUME_PORT')) {
            $port = 8000;
        }
        if (false === $host = getenv('RESUME_HOST')) {
            $host = '0.0.0.0';
        }

        $this
            ->taskServer($port)
            ->host($host)
            ->dir('web')
            ->run()
        ;
    }

    /**
     * Just a very thin wrapper around PHP-CS-Fixer.
     */
    public function phpcs()
    {
        $this
            ->taskSymfonyCommand(new PHPCSFixCommand())
            ->run()
        ;
    }

    /**
     * @return \Symfony\Component\DependencyInjection\ContainerBuilder
     */
    private function getContainer()
    {
        static $container;

        if (null === $container) {
            $container = (new ContainerBuilder(__DIR__))->getContainer();
        }

        return $container;
    }

    /**
     * @return Twig_Environment
     */
    private function getTwig()
    {
        static $twig;

        if (null === $twig) {
            $viewsPath = $this->getContainer()->getParameter('views.path');
            $loader = new Twig_Loader_Filesystem($viewsPath);
            $twig = new Twig_Environment($loader, [
                'strict_variables' => true,
                'debug' => true,
                'auto_reload' => true,
                'cache' => false,
            ]);

            if (class_exists('Symfony\Bridge\Twig\Extension\DumpExtension')) {
                $twig->addExtension(new Symfony\Bridge\Twig\Extension\DumpExtension(
                    new \Symfony\Component\VarDumper\Cloner\VarCloner()
                ));
            } else {
                $twig->addExtension(new Twig_Extension_Debug());
            }
            $twig->addExtension($this->getContainer()->get('app.twig.extension.resume'));
        }

        return $twig;
    }

    /**
     * @return string
     */
    private function getThirdPartyResourcesDirPath()
    {
        return __DIR__ . '/front-end-assets/js/node_modules';
    }

    /**
     * @return bool
     */
    private function isWindows()
    {
        return 0 === strncasecmp(php_uname('s'), 'WIN', 3);
    }

    /**
     * @param Twig_Environment $twig
     * @param string $language
     * @param array $viewVars
     */
    private function generateHtmlPage(Twig_Environment $twig, $language, array $viewVars)
    {
        $targetFilePath = sprintf(__DIR__ . '/web/index.%s.html', $language);

        file_put_contents($targetFilePath, $twig->render('index.html.twig', $viewVars));

        $this->say(sprintf('"%s" HTML template generated.', $targetFilePath));
    }
}
