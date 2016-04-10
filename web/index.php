<?php

// Good ol' PHP style! :-)

$lang = 'en';

if (isset($_GET['lang']) && in_array($_GET['lang'], ['fr', 'en'])) {
    $lang = $_GET['lang'];
} elseif (preg_match('~^/(fr|en)$~', $_SERVER['REQUEST_URI'], $matches)) {
    $lang = $matches[1];
} else {
    $firstBrowserLanguage = strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));
    if ('fr' === $firstBrowserLanguage) {
        $lang = 'fr';
    }
}

readfile('index.'.$lang.'.html');
