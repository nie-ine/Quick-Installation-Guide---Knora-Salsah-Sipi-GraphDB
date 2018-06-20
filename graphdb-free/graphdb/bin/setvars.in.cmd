@echo off

:: script must be used with setlocal enabledelayedexpansion

:: Find java.exe
if "%JAVA_HOME%" == "" (
    :: If JAVA_HOME isn't set look for java.exe in the PATH
    for %%I in (java.exe) do set JAVA="%%~$PATH:I"
    if '!JAVA!' == '""' (
        echo Could not find any executable java binary. Please install java in your PATH or set JAVA_HOME.
        exit /b 1
    )
) else (
    :: Use java.exe from JAVA_HOME
    set JAVA="%JAVA_HOME%\bin\java.exe"
)

:: Set GraphDB dist directory
set SCRIPT=%~dp0
for %%I in ("%SCRIPT%..") do set GDB_DIST=%%~dpfI

set GDB_CLASSPATH=%GDB_DIST%\lib\*

