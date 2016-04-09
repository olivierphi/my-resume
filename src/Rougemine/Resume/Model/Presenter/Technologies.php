<?php

namespace Rougemine\Resume\Model\Presenter;

use Rougemine\Resume\Model\ValueObject\Technology;

class Technologies
{
    /**
     * @var Technology[]
     */
    private $mainTechnologies;
    /**
     * @var Technology[]
     */
    private $otherTechnologies;

    /**
     * @param Technology[] $mainTechnologies
     * @param Technology[] $otherTechnologies
     */
    public function __construct(
        $mainTechnologies,
        $otherTechnologies
    ) {
        $this->mainTechnologies = $mainTechnologies;
        $this->otherTechnologies = $otherTechnologies;
    }

    /**
     * @return Technology[]
     */
    public function getMainTechnologies()
    {
        return $this->mainTechnologies;
    }

    /**
     * @return Technology[]
     */
    public function getOtherTechnologies()
    {
        return $this->otherTechnologies;
    }
}
