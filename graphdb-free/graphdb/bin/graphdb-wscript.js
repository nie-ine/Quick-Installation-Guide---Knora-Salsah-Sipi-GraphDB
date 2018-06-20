// WScript that will parse the arguments, print help, construct command line with the
// right classes and print any errors to standard error.
//
// This script is called by graphdb.cmd and should not be invoked directly.


var stdout = WScript.StdOut;
var stderr = WScript.StdErr;
var objArgs = WScript.Arguments;

function usage() {
    stderr.WriteLine("Usage: graphdb [-vsh] [-p pidfile] [-Dprop] [-Xprop]\n"
                    + "Start GraphDB.\n"
                    + "    -s            run in server only mode (no workbench)\n"
                    + "    -p pidfile    write PID to <pidfile>\n"
                    + "    -h\n"
                    + "    --help        print command line options\n"
                    + "    -v            print GraphDB version, then exit\n"
                    + "    -Dprop        set Java system property\n"
                    + "    -Xprop        set non-standard Java system property");
}

function complainAndExit(error) {
    stderr.WriteLine(error);
    stderr.WriteLine();
    usage();
    WScript.Quit(1);
}

function fixArgument(arg) {
    if (arg.indexOf('"')) {
        arg = arg.replace(/"/g, '""');
    }
    if (arg.indexOf(' ') || arg.indexOf('"')) {
        arg = '"' + arg + '"';
    }
    return arg;
}

var mainClass = "GraphDBWorkbench";
var arguments = [];
for (i = 0; i < objArgs.length; i++) {
    var arg = objArgs(i);
    if (arg == "-h" || arg == "--help" || arg == "/?") {
        usage();
        WScript.Quit(1);
    }

    if (arg.indexOf("-D") == 0 || arg.indexOf("-X") == 0) {
        // Handle the case where -Dfoo=bar is mangled by cmd.exe into two parameters "-Dfoo" and "bar"
        if (i + 1 < objArgs.length && objArgs(i + 1).indexOf("-") != 0) {
            arg += "=" + objArgs(++i);
        }

        arguments.push(fixArgument(arg));
    } else if (arg == "-s") {
        mainClass = "GraphDBServer";
    } else if (arg == "-p") {
        if (i + 1 == objArgs.length || objArgs(i + 1).indexOf("-") == 0) {
            // next argument is missing or starts with -, so file is missing
            complainAndExit("File missing for option -p");
        }
        arg = "-Dgraphdb.pidfile=" + objArgs(++i);
        arguments.push(fixArgument(arg));
    } else if (arg == "-v") {
        mainClass = "Version";
    } else {
        complainAndExit("Invalid parameter: " + arg);
    }
}

mainClass = "com.ontotext.graphdb.server." + mainClass;

var cmdLine = '"-Dgraphdb.foreground=yes" ' + arguments.join(" ") + " " + mainClass;
stdout.WriteLine(cmdLine);


