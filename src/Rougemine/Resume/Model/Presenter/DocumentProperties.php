<?php

namespace Rougemine\Resume\Model\Presenter;

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
     * @var string
     */
    private $punchline;
    /**
     * @var \DateTimeImmutable
     */
    private $generationDate;
    /**
     * @var bool
     */
    private $prodMode;

    /**
     * @param string $language
     * @param string $title
     * @param string $description
     * @param string $punchline
     * @param \DateTimeImmutable $generationDate
     * @param bool $prodMode
     */
    public function __construct(
        $language,
        $title,
        $description,
        $punchline,
        \DateTimeImmutable $generationDate,
        $prodMode
    ) {
        $this->language = $language;
        $this->title = $title;
        $this->description = $description;
        $this->punchline = $punchline;
        $this->generationDate = $generationDate;
        $this->prodMode = $prodMode;
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
     * @return string
     */
    public function getPunchline()
    {
        return $this->punchline;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getGenerationDate()
    {
        return $this->generationDate;
    }

    /**
     * @return bool
     */
    public function isProdMode()
    {
        return $this->prodMode;
    }
}
