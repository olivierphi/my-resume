<?php

namespace Rougemine\Resume\DependencyInjection;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Finder\Finder;

class TranslationsCompilerPass implements CompilerPassInterface
{
    /**
     * @param ContainerBuilder $container
     */
    public function process(ContainerBuilder $container)
    {
        $appTranslatorDefinition = $container->getDefinition('app.translator');
        $translationsPath = explode(',', $container->getParameter('translations.path'));

        $translationsFiles = (new Finder())
            ->files()
            ->name('*.yml')
            ->in($translationsPath)
        ;

        /** @var \Symfony\Component\Finder\SplFileInfo $translationFile */
        foreach ($translationsFiles as $translationFile) {
            if (!preg_match('~^(\w+)\.([a-z]{2})\.yml$~', $translationFile->getFilename(), $matches)) {
                continue;
            }

            list(, $domain, $language) = $matches;

            $appTranslatorDefinition->addMethodCall('addResource', [
                'yaml',
                $translationFile->getPathname(),
                $language,
                $domain
            ]);
        }
    }
}
