<?php

namespace Rougemine\Model\Presenter;

class DocumentProperties
{
    /**
     * @var string
     */
    private $language;
    /**
     * @var string
     */
    private $title;
    /**
     * @var string
     */
    private $description;
    /**
     * @var \DateTimeImmutable
     */
    private $generationDate;

    /**
     * @param string $language
     * @param string $title
     * @param string $description
     * @param \DateTimeImmutable $generationDate
     */
    public function __construct($language, $title, $description, \DateTimeImmutable $generationDate)
    {
        $this->language = $language;
        $this->title = $title;
        $this->description = $description;
        $this->generationDate = $generationDate;
    }

    /**
     * @return string
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getGenerationDate()
    {
        return $this->generationDate;
    }
}
