<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Olivier Philippon - Web Developer since 1999</title>
        <meta name="description" content="Olivier Philippon - Web Developer since 1999 - Ruby, Ruby on Rails, CoffeeScript, JavaScript, PHP, Flash freelance developer">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link href='http://fonts.googleapis.com/css?family=Marcellus' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Lobster+Two' rel='stylesheet' type='text/css'>

        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    
        <div id="main" class="clearfix">
            
            <section id="misc-info">
                <section>
                    <span class="header-icon"><img src="img/icons/headers/user.png" alt="me"></span>
                    Olivier Philippon<br>
                    Né le 11/07/1980<br>
                    68 blvd St-Marcel<br>
                    75005 Paris<br>
                    <a href="mailto:olivier@dr-benton.com">olivier@dr-benton.com</a><br>
                    Tel : +33 6 61 78 99 25
                </section>
                <section>
                    <span class="header-icon"><img src="img/icons/headers/github.png" alt="GitHub"></span>
                    <h3>Projets <i>Open Source</i></h3>
                    <a href="https://github.com/DrBenton" target="_blank">github.com/DrBenton</a>
                </section>
                <section>
                    <span class="header-icon"><img src="img/icons/headers/ruler.png" alt="school"></span>
                    <h3>Formation</h3>
                    1998-2000 : DUT S.R.C<br>
                    <i>(Services et Réseaux de Communication)</i><br>
                    1998: Bac série S
                </section>
                <section>
                    <span class="header-icon"><img src="img/icons/headers/chat.png" alt="languages"></span>
                    <h3>Langues</h3>
                    Anglais technique,<br>
                    espagnol scolaire
                </section>
                <section>
                    <span class="header-icon"><img src="img/icons/headers/fave.png" alt="hobbies"></span>
                    <h3>Centres d'intérêts</h3>
                    Dessin, astronomie,
                    aïkijutsu
                </section>
            </section><!-- end #misc-info -->
            
            <section id="main-panel">
                <h1>Olivier Philippon</h1>
                <h2>Développeur Web depuis 1999</h2>
                
                <section class="skills">
                    <h3><img src="img/icons/headers/tool-red.png" alt="" > Compétences principales</h3>
                    <?php
                    $technologies = array(
                      array(
                          'title' => 'Ruby',
                          'icon' => 'ruby',
                          'url' => 'https://www.ruby-lang.org/fr/',
                      ),  
                      array(
                          'title' => 'Ruby on Rails',
                          'icon' => 'rails',
                          'url' => 'http://rubyonrails.org',
                      ),  
                      array(
                          'title' => 'CoffeeScript',
                          'icon' => 'coffeescript',
                          'url' => 'http://coffeescript.org',
                      ),  
                      array(
                          'title' => 'JavaScript',
                          'icon' => 'javascript',
                      ),  
                      array(
                          'title' => 'PHP',
                          'icon' => 'php',
                      ),
                      array(
                          'title' => 'HTML / CSS',
                          'icon' => 'html5',
                      ),
                      array(
                          'title' => 'jQuery',
                          'icon' => 'jquery',
                      ),
                      array(
                          'title' => 'Flash',
                          'icon' => 'flash',
                      ),
                      array(
                          'title' => 'Symfony 2',
                          'icon' => 'symfony2',
                          'url' => 'http://symfony.com',
                      ),
                      array(
                          'title' => 'Node.js',
                          'icon' => 'symfony2',
                          'url' => 'http://nodejs.org',
                      ),
                      array(
                          'title' => 'MySQL',
                          'icon' => 'mysql',
                      ),
                      array(
                          'title' => 'Zend',
                          'icon' => 'zend-framework',
                          'url' => 'http://www.zendframework.com/',
                      ),
                      array(
                          'title' => 'Backbone.js',
                          'icon' => 'backbone',
                          'url' => 'http://backbonejs.org/',
                      ),
                      array(
                          'title' => 'Require.js',
                          'icon' => 'requirejs',
                          'url' => 'http://requirejs.org/',
                      ),
                      array(
                          'title' => 'Drupal',
                          'icon' => 'drupal',
                          'url' => 'http://drupal.org/',
                      ),
                      array(
                          'title' => 'Silex',
                          'icon' => 'silex',
                          'url' => 'http://silex.sensiolabs.org/',
                          'contributor-url' => 'https://github.com/fabpot/Silex/commit/6445b9e',
                      ),
                      array(
                          'title' => 'Robotlegs',
                          'icon' => 'robotlegs',
                          'url' => 'http://www.robotlegs.org/',
                      ),
                    );
                    ?>
                    <div class="technologies-container clearfix">
                        <?php 
                        foreach ($technologies as $tech) {
                            //$tech['icon'] = 'mysql';
                        ?>
                            <div class="tech clearfix">
                                <span class="icon">
                                    <img src="img/icons/techs/<?= $tech['icon'] ?>.png" alt="<?= $tech['title'] ?>">
                                </span>
                                <span class="title">
                                    <?php
                                    if (isset($tech['url'])) {
                                      echo '<a href="'.$tech['url'].'" target="_blank">'.$tech['title'].'</a>';
                                    } else {
                                      echo $tech['title'];  
                                    }
                                    ?>
                                </span>
                                <?php if (isset($tech['contributor-url'])) { ?>
                                <div class="contributor">
                                    <a href="<?= $tech['contributor-url'] ?>" target="_blank">(contributeur)</a>
                                </div>
                                <?php } ?>
                            </div><!-- end .tech -->
                        <?php
                        }
                        ?>
                    </div><!-- end .technologies-container -->
                    
                    <div class="tools">
                        <h4>Logiciels et environnements</h4>
                        <a href="http://www.jetbrains.com/idea/" target="_blank">IntelliJ IDEA</a>,
                        <a href="http://netbeans.org/" target="_blank">Netbeans</a>,
                        <a href="http://www.eclipse.org/" target="_blank">Eclipse</a>,
                        <a href="http://www.debian.org/" target="_blank">Debian</a>,
                        <a href="http://git-scm.com/" target="_blank">Git</a>,
                        <a href="http://vagrantup.com/" target="_blank">Vagrant</a>,
                        Flash,
                        Photoshop...
                    </div><!-- end .tools -->
                    
                </section><!-- end .skills -->
                
                <section class="experience">
                    <h3><img src="img/icons/headers/video-red.png" alt="" > Parcours professionnel</h3>
                    <ul>
                        <li>
                            <span class="period">2008 à aujourd'hui :</span>
                            Développeur Ruby / Javascript / PHP / Flash
                            freelance, en régie chez divers clients
                        </li>
                        <li>
                            <span class="period">Janvier à mai 2009 :</span>
                            Technical Lead du pôle «Jeux» de la
                            société montréalaise Tribal Nova
                        </li>
                        <li>
                            <span class="period">2006 à 2007 :</span>
                            Développeur ActionScript chez l'agence
                            Web Les Chinois, à cette époque leaders  du développement Flash en France
                        </li>
                        <li>
                            <span class="period">2005 :</span>
                            Développeur PHP / Flash chez l'agence Wcube
                        </li>
                        <li>
                            <span class="period">2000 à 2004 :</span>
                            Développeur Web chez le Groupe LP
                        </li>
                    </ul>
                </section><!-- end .experience -->

                <section class="works">
                    <h3><img src="img/icons/headers/lab-red.png" alt="" > Quelques réalisations</h3>
                    <ul>
                        <li>
                            Développement d'une application Web de <i>mass mailing</i> pour TV France International,
                            basée sur Ruby on Rails
                        </li>
                        <li>
                            Direction   technique   du   développement   Javascript   du
                            nouveau   site   mobile   de  <a href="http://www.mappy.com/" target="_blank">Mappy</a>,
                            participation   au développement Symfony2 du back-end
                        </li>
                        <li>
                            Direction technique du développement PHP de l'application
                            Facebook <a href="https://www.facebook.com/BoplerGames" target="_blank">Bopler Games</a>,
                            basée sur Zend Framework
                        </li>
                        <li>
                            Direction technique du développement du site du
                            <a href="http://www.musee-rodin.fr/" target="_blank">Musée Rodin</a>,
                            basé sur Drupal et Zend Framework
                        </li>
                        <li>
                            Développement de la partie
                            « <a href="http://www.visitprovence.com/guide-de-voyage" target="_blank">Guide de Voyage</a> »
                            du site VisitProvence.com

                        </li>
                    </ul>
                </section><!-- end .works -->
                
            </section><!-- end #main-panel -->


            
        </div><!-- end #main -->
    
    </body>
</html>
        