@echo off

REM Description: A script used to generate a sample 1M data and load it into a GraphDB repository
REM Verison: 0.3

REM constants
set cwd=%cd%
set benchark_dist_folder=%cwd%\driver\dist

REM Generate data and load it into repository
echo Generating data...
cd %benchark_dist_folder%

java -jar semantic_publishing_benchmark-basic-graphdb.jar %cwd%\properties\generate.and.load.bat.properties

cd %cwd%
