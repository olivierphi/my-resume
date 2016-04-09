<?php

namespace Rougemine\Resume\View;

use Rougemine\Resume\Generator\Presenter\DocumentPropertiesGenerator;
use Rougemine\Resume\Generator\Presenter\MePropertiesGenerator;
use Rougemine\Resume\Generator\Presenter\TechnologiesGenerator;

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
    /**
     * @var TechnologiesGenerator
     */
    private $technologiesGenerator;

    /**
     * @param DocumentPropertiesGenerator $documentPropertiesGenerator
     * @param MePropertiesGenerator $mePropertiesGenerator
     * @param TechnologiesGenerator $technologiesGenerator
     */
    public function __construct(
        DocumentPropertiesGenerator $documentPropertiesGenerator,
        MePropertiesGenerator $mePropertiesGenerator,
        TechnologiesGenerator $technologiesGenerator
    ) {
        $this->documentPropertiesGenerator = $documentPropertiesGenerator;
        $this->mePropertiesGenerator = $mePropertiesGenerator;
        $this->technologiesGenerator = $technologiesGenerator;
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
        $technologies = $this->technologiesGenerator
            ->getTechnologies()
        ;

        return [
            'document' => $documentProperties,
            'me' => $meProperties,
            'technologies' => $technologies,
        ];
    }
}
