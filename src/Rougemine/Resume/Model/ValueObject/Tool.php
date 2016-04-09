<?php

namespace Rougemine\Resume\Model\ValueObject;

class Tool
{
    /**
     * @var string
     */
    private $title;
    /**
     * @var string|null
     */
    private $url;

    /**
     * @param string $title
     * @param string|null $url
     */
    public function __construct($title, $url = null)
    {
        $this->title = $title;
        $this->url = $url;
    }

    /**
     * @return string|string[]
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return string|null
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @return bool
     */
    public function hasUrl()
    {
        return null !== $this->url;
    }
}
