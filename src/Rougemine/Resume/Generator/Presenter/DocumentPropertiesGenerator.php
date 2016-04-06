<?php

namespace Rougemine\Resume\Generator\Presenter;

use Rougemine\Model\Presenter\DocumentProperties;
use Symfony\Component\Translation\TranslatorInterface;

class DocumentPropertiesGenerator
{
    /**
     * @var TranslatorInterface
     */
    private $translator;

    public function __construct(
        TranslatorInterface $translator
    ) {
        $this->translator = $translator;
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
            $this->translator->trans('meta.title', [], 'messages', $language),
            $this->translator->trans('meta.description', [], 'messages', $language),
            new \DateTimeImmutable('now')
        );
    }
}
