<?php

$lang = 'en';
$httpLangOne = strtolower(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));
if ($httpLangOne === 'fr') {
    $lang = 'fr';
}

if (isset($_GET['lang']) && in_array($_GET['lang'], array('fr', 'en'))) {
    $lang = $_GET['lang'];
}

readfile('index.'.$lang.'.html');
