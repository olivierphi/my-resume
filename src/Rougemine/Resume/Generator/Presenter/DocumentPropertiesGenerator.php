<?php

namespace Rougemine\Resume\Generator\Presenter;

use Rougemine\Resume\Model\Presenter\DocumentProperties;
use Symfony\Component\Translation\TranslatorInterface;

class DocumentPropertiesGenerator extends AbstractTranslatedPropertiesGenerator
{
    protected static $transDomain = 'document';

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
            $this->trans($language, 'meta.title'),
            $this->trans($language, 'meta.description'),
            $this->trans($language, 'punchline.digging'),
            new \DateTimeImmutable('now')
        );
    }
}
