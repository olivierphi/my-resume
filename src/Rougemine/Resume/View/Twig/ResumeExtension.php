<?php

namespace Rougemine\Resume\View\Twig;


use Symfony\Component\Translation\TranslatorInterface;

class ResumeExtension extends \Twig_Extension
{
    const TRANSLATION_DOMAIN = 'messages';

    /**
     * @var TranslatorInterface
     */
    private $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('trans', [$this, 'trans'], ['needs_context' => true]),
        ];
    }

    /**
     * @param array $context
     * @param $transKey
     * @param array $transParams
     *
     * @return string
     */
    public function trans(array $context, $transKey, array $transParams = [])
    {
        $language = $context['document']->getLanguage();

        return $this->translator->trans($transKey, $transParams, self::TRANSLATION_DOMAIN, $language);
    }

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName()
    {
        return 'rougemine_resume';
    }
}
