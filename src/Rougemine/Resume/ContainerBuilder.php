<?php

namespace Rougemine\Resume;

use Rougemine\Resume\DependencyInjection\TranslationsCompilerPass;
use Symfony\Component\Config\ConfigCache;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\Compiler\PassConfig;
use Symfony\Component\DependencyInjection\ContainerBuilder as SymfonyContainerBuilder;
use Symfony\Component\DependencyInjection\Dumper\PhpDumper;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class ContainerBuilder
{
    const USE_CACHE = false;
    
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
        static $container;
        
        if (null !== $container) {
            return $container;
        }
        
        if (!static::USE_CACHE) {
            // No cache? This is simple!
            $container = $this->getNewContainer();
            
            return $container;
        }
        
        // Cached container? It's gonna be just a little bit more complex.
        $containerCacheFilePath = $this->appDir . '/var/tmp/container.php';
        $containerConfigCache = new ConfigCache($containerCacheFilePath, true);

        if (!$containerConfigCache->isFresh()) {
            $containerBuilder  = $this->getNewContainer();

            $dumper = new PhpDumper($containerBuilder);
            $containerConfigCache->write(
                $dumper->dump(),
                $containerBuilder->getResources()
            );
        }

        require_once $containerCacheFilePath;
        $container = new \ProjectServiceContainer();
        
        return $container;
    }
    
    private function getNewContainer()
    {
        $servicesDir = str_replace('%app.dir%', $this->appDir, self::SERVICES_DIR);

        $container = new SymfonyContainerBuilder();

        $this->setRuntimeParameters($container);

        // Services definitions loading
        $loader = new YamlFileLoader($container, new FileLocator($servicesDir));
        $loader->load('services.yml');

        // Compiler pass? Oh yes my dear, with pleasure!
        $container->addCompilerPass(new TranslationsCompilerPass(), PassConfig::TYPE_OPTIMIZE);

        // Okay, let's freeze that container!
        $container->compile();

        return $container;
    }

    /**
     * @param SymfonyContainerBuilder $containerBuilder
     */
    private function setRuntimeParameters(SymfonyContainerBuilder $containerBuilder)
    {
        // Some runtime parameters...
        $containerBuilder->setParameter('app.dir', $this->appDir);
        $containerBuilder->setParameter('app.tmp.dir', $this->appDir . '/var/tmp');

        $prodMode = getenv('PROD_MODE') ? true : false;
        $containerBuilder->setParameter('app.prodMode', $prodMode);

        $googleAnalyticsTrackingCode = getenv('GA_TRACKING_CODE') ?: null;
        $containerBuilder->setParameter('app.google.analytics.trackingCode', $googleAnalyticsTrackingCode);
    }
}
