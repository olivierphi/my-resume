<?php

namespace Rougemine\Resume\View\Twig;

use Povils\Figlet\FigletInterface;
use Symfony\Component\Translation\TranslatorInterface;

class ResumeExtension extends \Twig_Extension
{
    const TRANSLATION_DOMAIN = 'messages';

    /**
     * @var TranslatorInterface
     */
    private $translator;
    /**
     * @var FigletInterface
     */
    private $figlet;

    public function __construct(
        TranslatorInterface $translator,
        FigletInterface $figlet
    ) {
        $this->translator = $translator;
        $this->figlet = $figlet;
    }

    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('trans', [$this, 'trans'], ['needs_context' => true]),
            new \Twig_SimpleFilter('figlet', [$this, 'figlet']),
        ];
    }

    /**
     * @param array $context
     * @param string $transKey
     * @param array $transParams
     * @param string $language
     *
     * @return string
     */
    public function trans(array $context, $transKey, array $transParams = [], $language = null)
    {
        if (null === $language) {
            if (empty($context['document'])) {
                throw new \RuntimeException('No language found in "trans()" Twig function.');
            }
            $language = $context['document']->getLanguage();
        }

        return $this->translator->trans($transKey, $transParams, self::TRANSLATION_DOMAIN, $language);
    }

    /**
     * @param $text
     *
     * @return string
     */
    public function figlet($text)
    {
        return $this->figlet->render($text);
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
