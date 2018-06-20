@echo off

setlocal enabledelayedexpansion

call "%~dp0"\setvars.in.cmd || exit /b 1

:: run Java with the appropriate arguments
%JAVA% -cp "%GDB_CLASSPATH%" -Dgraphdb.dist="%GDB_DIST%" %*

endlocal
