<?php

use Robo\Tasks;
use Rougemine\Resume\ContainerBuilder;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\Process\Process;

class RoboFile extends Tasks
{
    public function build()
    {
        $this->npmInstall();
        $this->buildScss();
        $this->assetsInstall();
        $this->buildHtml();
    }

    public function npmInstall()
    {
        $npmPath = __DIR__ . '/vendor/nodejs/nodejs/npm';
        $thirdPartyResourcesPackageFilePath = dirname($this->getThirdPartyResourcesDirPath());

        $npmInstallCommand = "$npmPath install";
        $npmInstallProcess = new Process($npmInstallCommand, $thirdPartyResourcesPackageFilePath);
        $npmInstallProcess->run(function ($type, $buffer) {
            if (Process::ERR === $type) {
                echo 'ERR > '.$buffer;
            } else {
                echo 'OUT > '.$buffer;
            }
        });

        if (!$npmInstallProcess->isSuccessful()) {
            throw new RuntimeException('Failed to "npm install"');
        }
    }

    public function buildScss()
    {
        // No way to easily include CSS files content in a SCSS file, too bad :-/
        // --> we have to manually create "underscored-and-scss-ized" versions of third-party CSS assets...
        // @see https://github.com/sass/sass/issues/556#issuecomment-73439666
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
                "$scssDirPath/main.scss" => 'web/css/main.css'
            ])
            ->importDir($scssDirPath)
            ->run()
        ;
    }

    public function assetsInstall()
    {
        $sourceDirPath = __DIR__ . '/front-end-assets/img';
        $targetDirPath = __DIR__ . '/web/img';

        $this
            ->taskCopyDir([
                $sourceDirPath => $targetDirPath,
            ])
            ->run()
        ;

        // Let's remove SVG files, as we don't use them...
        $svgFiles = (new Finder())
            ->files()
            ->name('*.svg')
            ->in($targetDirPath)
        ;
        array_map(
            function (SplFileInfo $fileInfo) {
                unlink($fileInfo->getPathname());
            },
            iterator_to_array($svgFiles)
        );
    }

    public function buildHtml()
    {
        $twig = $this->getTwig();

        foreach (['en', 'fr'] as $language) {
            $viewVars = $this->getContainer()->get('app.view.presenters_generator')->getViewVarsPresenters($language);
            $this->generateHtmlPage($twig, $language, $viewVars);
        }
    }

    public function watch()
    {
        $this->build();

        $this
            ->taskWatch()
            ->monitor('front-end-assets/scss', function() {
                $this->say('SCSS files modified. CSS compilation...');
                $startTime = microtime(true);
                $this->buildScss();
                $this->say(sprintf('CSS compilation done. (%ss.)', round(microtime(true) - $startTime, 3)));
            })->monitor('src', function() {
                $this->say('PHP/YAML files modified. HTML compilation...');
                $startTime = microtime(true);
                $this->buildHtml();
                $this->say(sprintf('HTML compilation done. (%ss.)', round(microtime(true) - $startTime, 3)));
            })
            ->run()
        ;
    }

    public function serverStart()
    {
        $this
            ->taskServer(8000)
            ->dir('web')
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
        $viewsPath = $this->getContainer()->getParameter('views.path');
        $loader = new Twig_Loader_Filesystem($viewsPath);
        $twig = new Twig_Environment($loader, []);

        $twig->addExtension($this->getContainer()->get('app.twig.extension.resume'));

        return $twig;
    }

    private function getThirdPartyResourcesDirPath()
    {
        return __DIR__ . '/front-end-assets/js/node_modules';
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
    }
}
