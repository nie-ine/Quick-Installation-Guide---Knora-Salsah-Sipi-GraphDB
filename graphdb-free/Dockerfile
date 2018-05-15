FROM ubuntu:18.04

MAINTAINER Ivan Subotic "ivan.subotic@unibas.ch"
# adapted by Jan Clemens Stoffregen jan.stoffregen@uzh.ch

# Silence debconf messages
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

# Install.
RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get -qq update && \
  apt-get -y install \
    byobu curl git htop man vim wget unzip \
    openjdk-8-jdk && \
  rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"

# Install GraphDB-Free and clean up
RUN \
  curl -sS -o /tmp/graphdb.zip -L http://go.pardot.com/e/45622/7a-graphdb-free-8-3-1-dist-zip/4yxf7s/1143357223 && \
  unzip /tmp/graphdb.zip -d /tmp && \
  mv /tmp/graphdb-free-8.3.1 /graphdb && \
  git clone -b develop --single-branch --depth=1 https://github.com/dhlab-basel/Knora.git /knora && \
  cp /knora/webapi/scripts/KnoraRules.pie /graphdb && \
  rm /tmp/graphdb.zip && \
  rm -rf /knora

# Set GraphDB Max and Min Heap size
ENV GDB_HEAP_SIZE="4g"

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y curl
RUN apt-get install -y git
RUN apt-get install -y expect
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

EXPOSE 7200
CMD ["/graphdb/bin/graphdb"]