<?php

namespace Rougemine\Resume;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder as SymfonyContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class ContainerBuilder
{
    const SERVICES_DIR = '%app.dir%/src/Rougemine/Resources/config';

    /**
     * @var string
     */
    private $appDir;

    /**
     * @param string $appDir
     */
    public function __construct($appDir)
    {
        $this->appDir = $appDir;
    }

    /**
     * @return SymfonyContainerBuilder
     */
    public function getContainer()
    {
        $servicesDir = str_replace('%app.dir%', $this->appDir, self::SERVICES_DIR);

        $container = new SymfonyContainerBuilder();
        $container->setParameter('app.dir', $this->appDir);

        $loader = new YamlFileLoader($container, new FileLocator($servicesDir));
        $loader->load('services.yml');

        $container->compile();

        return $container;
    }
}
