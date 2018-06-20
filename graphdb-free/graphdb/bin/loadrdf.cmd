@echo off

call "%~dp0"\graphdb-java.in.cmd -Djdk.xml.entityExpansionLimit=0 com.ontotext.graphdb.loadrdf.LoadRDF %*
