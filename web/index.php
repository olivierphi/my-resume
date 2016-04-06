<?php

$lang = 'en';

if (isset($_GET['lang']) && in_array($_GET['lang'], ['fr', 'en'])) {
    $lang = $_GET['lang'];
} else {
    $httpLangOne = strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));
    if ('fr' === $httpLangOne) {
        $lang = 'fr';
    }
}

readfile('index.'.$lang.'.html');
