<?php

use Robo\Tasks;
use Rougemine\Resume\ContainerBuilder;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;

class RoboFile extends Tasks
{
    public function buildScss()
    {
        $this
            ->taskScss([
                'front-end-assets/scss/main.scss' => 'web/css/main.css'
            ])
            ->importDir('assets/styles')
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
        $loader = new Twig_Loader_Filesystem(__DIR__ . '/src/Rougemine/Resources/views');
        $twig = new Twig_Environment($loader, []);

        foreach (['en', 'fr'] as $language) {
            $this->generateHtmlPage($twig, $language);
        }
    }

    public function test()
    {
        echo 'test'.PHP_EOL;
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
     * @param Twig_Environment $twig
     * @param string $language
     */
    private function generateHtmlPage(Twig_Environment $twig, $language)
    {
        $documentProperties = $this->getContainer()
            ->get('app.generator.presenter.document_properties')
            ->getDocumentProperties($language)
        ;

        $targetFilePath = sprintf(__DIR__ . '/web/index.%s.html', $language);

        file_put_contents($targetFilePath, $twig->render('index.html.twig', [
            'document' => $documentProperties,
        ]));
    }
}
