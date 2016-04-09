<?php

namespace Rougemine\Resume\Model\ValueObject;

class JobExperience
{
    /**
     * @var string
     */
    private $period;
    /**
     * @var string
     */
    private $content;

    /**
     * @param string $period
     * @param string $content
     */
    public function __construct($period, $content)
    {
        $this->period = $period;
        $this->content = $content;
    }

    /**
     * @return string
     */
    public function getPeriod()
    {
        return $this->period;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }
}
