@echo off

REM Description: A script for running LDBC Semantic Publishing Benchmark driver
REM Verison: 0.3

REM constants
set cwd=%cd%
set benchark_dist_folder=%cwd%\driver\dist

REM Generate data and load it into repository
echo Generating data...
cd %benchark_dist_folder%

java -jar semantic_publishing_benchmark-basic-graphdb.jar %cwd%\properties\benchmark.bat.properties

echo:
echo Results are saved at: %benchark_dist_folder%\logs

cd %cwd%
