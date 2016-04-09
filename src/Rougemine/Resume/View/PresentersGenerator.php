<?php

namespace Rougemine\Resume\View;

use Rougemine\Resume\Generator\Presenter\DocumentPropertiesGenerator;
use Rougemine\Resume\Generator\Presenter\MePropertiesGenerator;
use Symfony\Component\Translation\TranslatorBagInterface;

class PresentersGenerator
{
    const MISC_MESSAGES_TRANSLATION_DOMAIN = 'misc';

    /**
     * @var TranslatorBagInterface
     */
    private $translatorBag;
    /**
     * @var DocumentPropertiesGenerator
     */
    private $documentPropertiesGenerator;
    /**
     * @var MePropertiesGenerator
     */
    private $mePropertiesGenerator;

    public function __construct(
        TranslatorBagInterface $translatorBag,
        DocumentPropertiesGenerator $documentPropertiesGenerator,
        MePropertiesGenerator $mePropertiesGenerator
    ) {
        $this->translatorBag = $translatorBag;
        $this->documentPropertiesGenerator = $documentPropertiesGenerator;
        $this->mePropertiesGenerator = $mePropertiesGenerator;
    }

    /**
     * @param string $language
     *
     * @return array
     */
    public function getViewVarsPresenters($language)
    {
        $miscMessages = $this->translatorBag->getCatalogue($language)->all(self::MISC_MESSAGES_TRANSLATION_DOMAIN);

        $documentProperties = $this->documentPropertiesGenerator
            ->getDocumentProperties($language)
        ;
        $meProperties = $this->mePropertiesGenerator
            ->getMeProperties($language)
        ;

        return [
            'document' => $documentProperties,
            'me' => $meProperties,
            'misc' => $miscMessages,
        ];
    }
}
