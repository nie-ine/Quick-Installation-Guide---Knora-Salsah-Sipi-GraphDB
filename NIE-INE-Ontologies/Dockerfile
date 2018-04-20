# docker run -v ./Ontologies/NIE_Knora_ontology-dependency/:/usr/src/app/nieKnoraDependencies

FROM ubuntu:17.10

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y curl
RUN apt-get install -y git
RUN git clone https://github.com/dhlab-basel/Knora.git
RUN git clone https://github.com/nie-ine/Ontologies.git

COPY . /

# Copy admin data
RUN cp -fr /Ontologies/NIE_Knora_ontology-dependency/admin-data.ttl /Knora/webapi/_test_data/all_data/

# Copy permissions data
RUN cp -fr /Ontologies/NIE_Knora_ontology-dependency/permissions-data.ttl /Knora/webapi/_test_data/all_data/

# Copy Expect File
RUN cp -fr /Ontologies/NIE_Knora_ontology-dependency/graphdb-knora-test-data.expect /Knora/webapi/scripts/

# Copy NIE-INE Ontologies
RUN cp  -R /Ontologies/nie-ontologies/. /Knora/webapi/_test_data/ontologies/



CMD cd /Knora/webapi/scripts/ && ./graphdb-free-init-knora-test.sh