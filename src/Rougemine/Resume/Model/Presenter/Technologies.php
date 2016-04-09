<?php

namespace Rougemine\Resume\Model\Presenter;

use Rougemine\Resume\Model\ValueObject\Technology;
use Rougemine\Resume\Model\ValueObject\Tool;

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
     * @var Tool[]
     */
    private $tools;

    /**
     * @param Technology[] $mainTechnologies
     * @param Technology[] $otherTechnologies
     * @param Tool[] $tools
     */
    public function __construct(
        $mainTechnologies,
        $otherTechnologies,
        $tools
    ) {
        $this->mainTechnologies = $mainTechnologies;
        $this->otherTechnologies = $otherTechnologies;
        $this->tools = $tools;
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

    /**
     * @return Tool[]
     */
    public function getTools()
    {
        return $this->tools;
    }
}
