<?php

namespace Rougemine\Resume\View;

use Rougemine\Resume\Generator\Presenter\DocumentPropertiesGenerator;
use Rougemine\Resume\Generator\Presenter\MePropertiesGenerator;

class PresentersGenerator
{
    /**
     * @var DocumentPropertiesGenerator
     */
    private $documentPropertiesGenerator;
    /**
     * @var MePropertiesGenerator
     */
    private $mePropertiesGenerator;

    public function __construct(
        DocumentPropertiesGenerator $documentPropertiesGenerator,
        MePropertiesGenerator $mePropertiesGenerator
    ) {
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
        $documentProperties = $this->documentPropertiesGenerator
            ->getDocumentProperties($language)
        ;
        $meProperties = $this->mePropertiesGenerator
            ->getMeProperties($language)
        ;

        return [
            'document' => $documentProperties,
            'me' => $meProperties,
        ];
    }
}
