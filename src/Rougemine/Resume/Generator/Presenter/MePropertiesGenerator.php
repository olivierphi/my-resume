<?php

namespace Rougemine\Resume\Generator\Presenter;

use Rougemine\Resume\Model\Presenter\MeProperties;
use Symfony\Component\Translation\TranslatorInterface;

class MePropertiesGenerator extends AbstractTranslatedPropertiesGenerator
{
    protected static $transDomain = 'me';

    public function __construct(
        TranslatorInterface $translator
    ) {
        $this->translator = $translator;
    }

    /**
     * @param string $language
     *
     * @return MeProperties
     */
    public function getMeProperties($language)
    {
        return new MeProperties(
            $this->trans($language, 'name'),
            $this->trans($language, 'birth'),
            $this->trans($language, 'address')
        );
    }
}
