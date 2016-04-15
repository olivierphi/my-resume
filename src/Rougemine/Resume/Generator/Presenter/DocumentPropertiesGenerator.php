<?php

namespace Rougemine\Resume\Generator\Presenter;

use Rougemine\Resume\Model\Presenter\DocumentProperties;
use Symfony\Component\Translation\TranslatorInterface;

class DocumentPropertiesGenerator extends AbstractTranslatedPropertiesGenerator
{
    protected static $transDomain = 'document';

    /**
     * @var bool
     */
    private $prodMode;
    /**
     * @var string
     */
    private $googleAnalyticsTrackingCode;

    /**
     * @param TranslatorInterface $translator
     * @param bool $prodMode
     * @param string $googleAnalyticsTrackingCode
     */
    public function __construct(
        TranslatorInterface $translator,
        $prodMode,
        $googleAnalyticsTrackingCode
    ) {
        $this->translator = $translator;
        $this->prodMode = $prodMode;
        $this->googleAnalyticsTrackingCode = $googleAnalyticsTrackingCode;
    }

    /**
     * @param string $language
     *
     * @return DocumentProperties
     */
    public function getDocumentProperties($language)
    {
        return new DocumentProperties(
            $language,
            $this->trans($language, 'meta.title'),
            $this->trans($language, 'meta.description'),
            $this->trans($language, 'punchline.digging'),
            new \DateTimeImmutable('now'),
            $this->prodMode,
            $this->googleAnalyticsTrackingCode
        );
    }
}
