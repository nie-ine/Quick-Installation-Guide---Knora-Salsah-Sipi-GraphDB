@echo off

:: OPTIONS:
::    -s            run in server only mode (no workbench)
::    -p pidfile    write PID to <pidfile>
::    -h
::    --help        print command line options
::    -v            print GraphDB version, then exit
::    -Dprop        set Java system property
::    -Xprop        set non-standard Java system property
::
:: CONTROLLING STARTUP:
::
:: You can use these environment variables to control some options:
::
::    GDB_JAVA_OPTS      - Sets additional Java options (-D or -X)
::    GDB_MIN_MEM        - Sets the Java minimum heap size (-Xms option).
::    GDB_MAX_MEM        - Sets the Java maximum heap size (-Xmx option).
::    GDB_HEAP_SIZE      - Sets the Java minimum and maximum heap size (-Xms and -Xmx option).
::                         Overrides both GDB_MIN_MEM and GDB_MAX_MEM.
::                         Recommended if you need to specify the heap size.
::    GDB_HEAP_NEWSIZE   - Sets the initial and maximum heap size for the young generation (-Xmn option).
::    GDB_GC_LOG         - Enables (if set to true) the logging of Java garbage collection.
::                         The log will be written to gc-<pid>.log in the distribution directory,
::                         unless GDB_GC_LOG_FILE is set to a custom file.
::    GDB_GC_LOG_FILE    - Specifies a custom file for GC logging.


setlocal enabledelayedexpansion

call "%~dp0"\setvars.in.cmd || exit /b 1
call "%~dp0"\graphdb.in.cmd || exit /b 1

:: CMD.EXE is rather limited in functionality so we we resort to a helper script in Windows JScript
for /f "usebackq tokens=*" %%a in (`cscript /b "%~dp0"\graphdb-wscript.js %*`) do (
    %JAVA% -cp "%GDB_CLASSPATH%" %JAVA_OPTS% %GDB_JAVA_OPTS% -Dgraphdb.dist="%GDB_DIST%" %%a < nul
    goto :eof
)

:: if we got here we didn't run anything, signal this to caller
exit /b 1