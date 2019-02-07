#!/usr/bin/env bash

git clone --depth=1 https://github.com/dhlab-basel/Knora.git  || true
git clone --depth=1 https://github.com/nie-ine/Ontologies-shared.git  || true

# Copy admin data
cp -fr ./Ontologies-shared/NIE_Knora_ontology-dependency_shared/admin-data.ttl ./Knora/webapi/_test_data/all_data/

# Copy permissions data
cp -fr ./Ontologies-shared/NIE_Knora_ontology-dependency_shared/permissions-data.ttl ./Knora/webapi/_test_data/all_data/

# Copy Expect File
cp -fr ./Ontologies-shared/NIE_Knora_ontology-dependency_shared/graphdb-knora-test-data.expect ./Knora/webapi/scripts/

# Copy Template File
cp -fr ./Ontologies-shared/NIE_Knora_ontology-dependency_shared/graphdb-free-knora-test-repository-config.ttl.tmpl ./Knora/webapi/scripts/

# Copy NIE-INE Ontologies
cp  -R ./Ontologies-shared/nie-ontologies_shared/. ./Knora/webapi/_test_data/ontologies/

cd Knora/webapi/scripts/ && ./graphdb-free-docker-init-knora-test.sh && cd ../../..do ker
