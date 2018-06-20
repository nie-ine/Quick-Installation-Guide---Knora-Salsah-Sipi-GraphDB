#!/bin/bash

#Description: A script downloading latest version of the LDBC-SPB driver and building a distribution for GraphDB
#Verison: 0.3

#constants
github_repository="https://github.com/ldbc/ldbc_spb_bm_2.0.git"
cwd=`pwd`
destination_folder="$cwd/driver"

#check if required software component is installed on the system, exits the script on error
check_for_required_component() {
	if which $1 > /dev/null; then
		echo -e "\tcomponent: $1 found...ok"
		return 1
	else
		echo -e "\tWARNING : required component: $1 is not installed. Exiting..."
		exit 0
	fi
}

#check for all required software components
echo -e "\nChecking for required software..."
check_for_required_component "git"
check_for_required_component "java"
check_for_required_component "javac"
check_for_required_component "ant"

#clone from GitHub
echo -e "\nCloning from GitHub..."
git clone $github_repository $destination_folder

#Build
echo -e "\nBuilding..."
cd $destination_folder
ant build-basic-querymix-graphdb

cd $cwd
