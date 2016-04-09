<?php

namespace Rougemine\Resume\Generator\Presenter;

use Symfony\Component\Translation\TranslatorInterface;

abstract class AbstractTranslatedPropertiesGenerator
{
    protected static $transDomain = 'messages';

    /**
     * @var TranslatorInterface
     */
    protected $translator;

    /**
     * @param string $language
     * @param string $transKey
     * @param array $transParams
     *
     * @return string
     */
    protected function trans($language, $transKey, array $transParams = [])
    {
        return $this->translator->trans($transKey, $transParams, static::$transDomain, $language);
    }
}
