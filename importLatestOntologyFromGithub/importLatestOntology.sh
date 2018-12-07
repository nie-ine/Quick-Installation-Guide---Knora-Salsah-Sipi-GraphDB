#!/usr/bin/env bash

git clone --depth=1 https://github.com/dhlab-basel/Knora.git  || true
git clone --depth=1 https://github.com/nie-ine/Ontologies.git  || true

# Copy admin data
cp -fr ./Ontologies/NIE_Knora_ontology-dependency/admin-data.ttl ./Knora/webapi/_test_data/all_data/

# Copy permissions data
cp -fr ./Ontologies/NIE_Knora_ontology-dependency/permissions-data.ttl ./Knora/webapi/_test_data/all_data/

# Copy Expect File
cp -fr ./Ontologies/NIE_Knora_ontology-dependency/graphdb-knora-test-data.expect ./Knora/webapi/scripts/

# Copy NIE-INE Ontologies
cp  -R ./Ontologies/nie-ontologies/. ./Knora/webapi/_test_data/ontologies/

# Copy adapted admin-data.ttl

cp -fr ./admin-data.ttl ./Knora/webapi/_test_data/all_data/

cd Knora/webapi/scripts/ && ./graphdb-free-docker-init-knora-test.sh && cd ../../..
