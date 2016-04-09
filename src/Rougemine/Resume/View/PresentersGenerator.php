<?php

namespace Rougemine\Resume\View;

use Rougemine\Resume\Generator\Presenter\DocumentPropertiesGenerator;
use Rougemine\Resume\Generator\Presenter\JobsExperienceGenerator;
use Rougemine\Resume\Generator\Presenter\MePropertiesGenerator;
use Rougemine\Resume\Generator\Presenter\TechnologiesGenerator;
use Rougemine\Resume\Generator\Presenter\WorksGenerator;

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
     * @var JobsExperienceGenerator
     */
    private $jobsExperienceGenerator;
    /**
     * @var WorksGenerator
     */
    private $worksGenerator;

    /**
     * @param DocumentPropertiesGenerator $documentPropertiesGenerator
     * @param MePropertiesGenerator $mePropertiesGenerator
     * @param TechnologiesGenerator $technologiesGenerator
     * @param JobsExperienceGenerator $jobsExperienceGenerator
     * @param WorksGenerator $worksGenerator
     */
    public function __construct(
        DocumentPropertiesGenerator $documentPropertiesGenerator,
        MePropertiesGenerator $mePropertiesGenerator,
        TechnologiesGenerator $technologiesGenerator,
        JobsExperienceGenerator $jobsExperienceGenerator,
        WorksGenerator $worksGenerator
    ) {
        $this->documentPropertiesGenerator = $documentPropertiesGenerator;
        $this->mePropertiesGenerator = $mePropertiesGenerator;
        $this->technologiesGenerator = $technologiesGenerator;
        $this->jobsExperienceGenerator = $jobsExperienceGenerator;
        $this->worksGenerator = $worksGenerator;
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
        $jobsExperience = $this->jobsExperienceGenerator
            ->getJobsExperience($language)
        ;
        $works = $this->worksGenerator
            ->getWorks($language)
        ;

        return [
            'document' => $documentProperties,
            'me' => $meProperties,
            'technologies' => $technologies,
            'jobsExperience' => $jobsExperience,
            'works' => $works,
        ];
    }
}
