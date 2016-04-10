<?php

// Good ol' PHP style! :-)

$lang = 'en';

if (isset($_GET['lang']) && in_array($_GET['lang'], ['fr', 'en'])) {
    $lang = $_GET['lang'];
} else {
    $firstBrowserLanguage = strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));
    if ('fr' === $firstBrowserLanguage) {
        $lang = 'fr';
    }
}

readfile('index.'.$lang.'.html');
