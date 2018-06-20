#!/bin/bash

#Description: A script for running LDBC Semantic Publishing Benchmark driver
#Verison: 0.3

#constants
cwd=`pwd`
benchark_dist_folder="$cwd/driver/dist"

#Run the benchmark
echo -e "\nRunning benchmark..."
cd $benchark_dist_folder
java -jar semantic_publishing_benchmark-basic-graphdb.jar "$cwd/properties/benchmark.properties"

echo -e "\nResults are saved at: $benchark_dist_folder/logs"

cd $cwd

