<?php

class RoboFile extends \Robo\Tasks
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

    public function buildHtml()
    {
        $loader = new Twig_Loader_Filesystem(__DIR__ . '/src/Rougemine/Resources/views');
        $twig = new Twig_Environment($loader, []);

        file_put_contents(__DIR__ . '/web/index.html', $twig->render('index.html.twig', []));
    }

    public function test()
    {
        echo 'test'.PHP_EOL;
    }
}
