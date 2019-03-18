#!/usr/bin/env bash

# Clone shared ontologies from github
cd ./ontologies/
git clone --depth=1 https://github.com/nie-ine/Ontologies-shared.git || true

# Copy admin data
cp -fr ./Ontologies-shared/NIE_Knora_ontology-dependency_shared/admin-data.ttl ../data/

# Copy permissions data
cp -fr ./Ontologies-shared/NIE_Knora_ontology-dependency_shared/permissions-data.ttl ../data/

# Copy Expect File
cp -fr ./Ontologies-shared/NIE_Knora_ontology-dependency_shared/graphdb-knora-test-data.expect ../scripts/graphdb-knora-test-data.expect

# Copy Template File
cp -fr ./Ontologies-shared/NIE_Knora_ontology-dependency_shared/graphdb-free-knora-test-repository-config.ttl.tmpl ../scripts/

# Copy NIE-INE Ontologies
cp  -R ./Ontologies-shared/nie-ontologies_shared/. ./project-ontologies/

cd ../scripts/ && ./graphdb-free-docker-init-knora-test.sh && cd ..
