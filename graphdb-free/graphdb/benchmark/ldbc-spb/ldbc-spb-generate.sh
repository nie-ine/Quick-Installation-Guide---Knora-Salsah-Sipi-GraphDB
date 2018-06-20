#!/bin/bash

#Description: A script used to generate a sample 1M data and load it into a GraphDB repository
#Verison: 0.3

#constants
cwd=`pwd`
benchark_dist_folder="$cwd/driver/dist"

#Generate data and load it into repository
echo -e "\nGenarting data..."
cd $benchark_dist_folder
java -jar semantic_publishing_benchmark-basic-graphdb.jar "$cwd/properties/generate.and.load.properties"

cd $cwd

