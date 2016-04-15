<?php

namespace Rougemine\Resume;

use Rougemine\Resume\DependencyInjection\TranslationsCompilerPass;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Compiler\PassConfig;
use Symfony\Component\DependencyInjection\ContainerBuilder as SymfonyContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class ContainerBuilder
{
    const SERVICES_DIR = '%app.dir%/src/Rougemine/Resume/Resources/config';

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

        // Some runtime parameters...
        $container->setParameter('app.dir', $this->appDir);
        $prodMode = getenv('PROD_MODE') ? true : false;
        $container->setParameter('app.prodMode', $prodMode);
        $googleAnalyticsTrackingCode = getenv('GA_TRACKING_CODE') ?: null;
        $container->setParameter('app.google.analytics.trackingCode', $googleAnalyticsTrackingCode);

        // Services definitions loading
        $loader = new YamlFileLoader($container, new FileLocator($servicesDir));
        $loader->load('services.yml');

        // Compiler pass? Oh yes my dear, with pleasure!
        $container->addCompilerPass(new TranslationsCompilerPass(), PassConfig::TYPE_OPTIMIZE);

        // Okay, let's freeze that container!
        $container->compile();

        return $container;
    }
}
