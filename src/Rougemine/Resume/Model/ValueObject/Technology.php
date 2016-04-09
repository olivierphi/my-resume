<?php

namespace Rougemine\Resume\Model\ValueObject;

class Technology
{
    /**
     * @var string|string[]
     */
    private $title;
    /**
     * @var string
     */
    private $icon;
    /**
     * @var string|string[]|null
     */
    private $url;
    /**
     * @var string|null
     */
    private $contributorUrl;

    /**
     * @param string|string[] $title
     * @param string $icon
     * @param string|string[]|null $url
     * @param string|null $contributorUrl
     */
    public function __construct($title, $icon, $url = null, $contributorUrl = null)
    {
        $this->title = $title;
        $this->icon = $icon;
        $this->url = $url;
        $this->contributorUrl = $contributorUrl;
    }

    /**
     * @return string|string[]
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return bool
     */
    public function hasMultipleTitles()
    {
        return is_array($this->title) && !empty($this->title);
    }

    /**
     * @return string
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * @return string|string[]|null
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

    /**
     * @return bool
     */
    public function hasMultipleUrls()
    {
        return $this->hasUrl() && is_array($this->url) && !empty($this->url);
    }

    /**
     * @param $index
     *
     * @return string|null
     */
    public function getTechUrlAt($index)
    {
        return !$this->hasMultipleUrls() || !isset($this->url[$index])
            ? null
            : $this->url[$index]
        ;
    }

    /**
     * @return string|null
     */
    public function getContributorUrl()
    {
        return $this->contributorUrl;
    }

    /**
     * @return bool
     */
    public function hasContributorUrl()
    {
        return null !== $this->contributorUrl;
    }
}
