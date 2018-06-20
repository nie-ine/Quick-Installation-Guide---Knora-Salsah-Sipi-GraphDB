@echo off

REM Description: A script downloading latest version of the LDBC-SPB driver and building a distribution for GraphDB
REM Verison: 0.3

REM constants
set github_repository="https://github.com/ldbc/ldbc_spb_bm_2.0.git"
set cwd=%cd%
set destination_folder=%cwd%\driver

REM check if a required software component is installed on the system, exits the script on error
echo Checking for required software...
REM GIT
set component=git
where %component% > nul
if ERRORLEVEL 1 goto requirements_error
echo  component %component% found...ok
REM JAVAC
set component=java
where %component% > nul
if ERRORLEVEL 1 goto requirements_error
echo  component %component% found...ok
REM JAVAC
set component=javac
where %component% > nul
if ERRORLEVEL 1 goto requirements_error
echo  component %component% found...ok
REM ANT
set component=ant
where %component% > nul
if ERRORLEVEL 1 goto requirements_error
echo  component %component% found...ok

REM clone latest LDBC-SPB Driver from GitHub
echo Cloning from GitHub...
git clone %github_repository% %destination_folder%

REM Build
echo Building...
cd %destination_folder%
call ant build-basic-querymix-graphdb
cd %cwd%

goto end:

:requirements_error
echo  WARNING : %component% is not installed. Exiting...

:end
