<?php

$finder = Symfony\CS\Finder\DefaultFinder::create()
    ->in(__DIR__)
    ->exclude('front-end-assets')
    ->exclude('web')
;

return Symfony\CS\Config\Config::create()
    ->fixers([
        // PSR2/Symfony code styles rules blacklisting:
        '-phpdoc_params',
        '-list_commas',
        '-empty_return',
        '-concat_without_spaces',
        // Additional code style rules whitelisting:
        'short_array_syntax',
        'ordered_use',
        'newline_after_open_tag',
    ])
    ->finder($finder)
;
