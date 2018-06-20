#!/bin/bash

if [ -x "$JAVA_HOME/bin/java" ]; then
    JAVA="$JAVA_HOME/bin/java"
else
    JAVA=`which java`
fi

if [ ! -x "$JAVA" ]; then
    echo "Could not find any executable java binary. Please install java in your PATH or set JAVA_HOME"
    exit 1
fi

SCRIPT="$0"

# SCRIPT may be an arbitrarily deep series of symlinks. Loop until we have the concrete path.
while [ -h "$SCRIPT" ] ; do
  ls=`ls -ld "$SCRIPT"`
  # Drop everything prior to ->
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    SCRIPT="$link"
  else
    SCRIPT=`dirname "$SCRIPT"`/"$link"
  fi
done

# graphdb dist directory
GDB_DIST=`dirname "$SCRIPT"`/..

# make GDB_DIST absolute
GDB_DIST=`cd "$GDB_DIST"; pwd`

GDB_CLASSPATH="$GDB_DIST/lib/*"

call_java() {
    "$JAVA" -cp "$GDB_CLASSPATH" -Dgraphdb.dist="$GDB_DIST" "$@"
}


