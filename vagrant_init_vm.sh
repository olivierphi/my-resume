#!/bin/bash

# Make sure we are the "vagrant" user
if [[ "$USER" != "vagrant" ]]; then
   echo "This script must be run with the 'vagrant' user!."
   exit 1
fi

# Make sure we are "sourced"
if [[ "x$0" != "xbash" && "x$0" != "x-bash" ]]; then
   echo "This script must be sourced! Use 'source [this script.sh]' instead of './[this script.sh]'."
   exit 1
fi


report_step()
{
	echo 
	echo "****************************"
	echo "*** $1"
	echo "****************************"
	echo 
}

report_sub_step()
{
	echo 
	echo "*** $1"
	echo 
}

update_debian_sources()
{
	report_step "Debian sources update..."
	sudo apt-get update
}

enable_ubuntu_ppa()
{
	report_step "Ubuntu PPA activation..."
	sudo apt-get install -y python-software-properties
}

install_misc_utils()
{
	report_step "Misc utils install (Git, Curl, make, etc.) ..."
	sudo apt-get install -y git curl wget build-essential udev
	# (yeah, we may need udev because of this VM bug :
	# http://www.ducea.com/2009/02/18/linux-tips-bash-completion-devfd62-no-such-file-or-directory/
	# )
}

install_apache_php()
{
	report_step "Apache and PHP install..."
	sudo apt-get install -y apache2 php5

	report_sub_step "Apache 'www-data' user is added to the 'vagrant' group.\nUse \n'config.vm.synced_folder \"./\", \"/vagrant\", :mount_options => [\"dmode=775,fmode=774\"]'\n in your Vagrantfile to resolve Apache write permissions issues."
	sudo usermod -a -G vagrant www-data
}

install_rougemine_features()
{
	report_step "Rougemine.com specific PHP requirements install..."
	sudo apt-get install -y imagemagick pdftk
}

install_php_composer()
{
	report_step "PHP Composer is installed globally..."
	curl -sS https://getcomposer.org/installer | php
	sudo mv composer.phar /usr/local/bin/composer
}

install_webmin()
{
	report_step "Webmin install..."
	wget http://prdownloads.sourceforge.net/webadmin/webmin_1.650_all.deb
	sudo dpkg -i webmin_1.650_all.deb
	sudo apt-get install -y -f
	rm webmin_*
}


install_nodejs()
{
	report_step "Node.js install..."
	sudo add-apt-repository -y ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install -y nodejs
}


# Ok, let's roll!!

# ######### In Spain, first we update, THEN when install!
update_debian_sources


# ######### We may need some PPA...
enable_ubuntu_ppa


# ######### Misc utils
install_misc_utils


# ######### LAMP environnement
install_apache_php

install_rougemine_features

install_php_composer



# ######### Webmin
install_webmin


# ######### We may need a recent Node.js install for CoffeeScript compilation...
install_nodejs


# ######### Finished!
report_step "Finished!"
echo 
echo "Now you call configure the Apache VHost, with DocumentRoot to /vagrant/ and 'AllowOverride ALL' if needed..."
echo
echo "'EnableSendfile Off' &  'EnableMMAP Off' directives may be needed too."
echo "(@see https://www.virtualbox.org/ticket/819)"
echo 



