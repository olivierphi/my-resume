# Rougemine.com - online resume

What could be more pleasant than totally over-engineering your online resume when you're a Web Developer in 2010+ ?

[The previous version](https://github.com/DrBenton/rougemine.com-online-resume/tree/v1) was based on Node.js, CoffeeScript and gulp.  
For this version I wanted to test a "full PHP" setup - including assets management. Well... It works! :-)

So, in order to generate only 2 HTML pages and 2 PDF files, I've had the pleasure to use the following technologies:
 * [Robo](http://robo.li/) as a task runner. It's very different from Grunt/gulp, as there is no tasks dependencies management, but it's a nice tool to work with it - and there are a lot of built-in tasks.
 * [Symfony Dependency Injection container](http://symfony.com/doc/current/components/dependency_injection/introduction.html): as a Symfony developer, it's hard for me to work without it now - even if it's for a dumb CLI app like this one :-)  
   Isn't it cool to wire all application components in [a YAML file](https://github.com/DrBenton/rougemine.com-online-resume/blob/master/src/Rougemine/Resume/Resources/config/services.yml)?
 * Composer packages which allows one to have a local pre-built binary version of Wkhtmltopdf or Node.js - for both Windows and Linux. This is quite handy.  
   (see *"h4cc/wkhtmltopdf-amd64"*, *"wemersonjanuario/wkhtmltopdf-windows"* and *"mouf/nodejs-installer"* on [Packagist](https://packagist.org/))
 * Even if it's probably not as efficient as dedicated tools in Node.js, it's possible to use [SCSS compilation](http://leafo.github.io/scssphp/) and [CSS minification](https://github.com/natxet/CssMin) in "pure PHP". Can be useful.
 
Because my new shiny-but-not-yet-supported-laptop can't run Ubuntu at the moment, I had to work on this app on Windows. Yes, it's been a pain.  
But thanks to that I could notice that PHP tools (and especially Symfony components) have a better support of Windows nowadays. PHP is really a multiplatform programming language now!

## LICENSE

Excepted files in the *"front-end-assets/img/icons/"* folder, this app is licensed under the MIT license.
