# How to import NIE-INE Ontologies

To import NIE-INE Ontologies, just follow the following steps:

* from the main folder change to the folder *importLatestOntologyForGithub*
* execute *importLatesteOntology.sh*, which downloads the current version of NIE-INE shared Ontologies und upload them into the triplestore
* restart Knora

```
$ cd importLatestOntologyFromGithub
$ ./importLatestOntology.sh
```

**Note:** the script is using parts of the **Knora** project code, which is currently developed by the [Digital Humanities Lab](http://www.dhlab.unibas.ch/) at the University of Basel.
The complete code is available at [github](https://github.com/dhlab-basel/Knora).

In the following you will find a short description of Knora and its features:


## Knora

[Knora](http://www.knora.org/) (Knowledge Organization, Representation, and Annotation) is a server
application for storing, sharing, and working with primary sources and data in the humanities.

It is developed by the [Digital Humanities Lab](http://www.dhlab.unibas.ch/) at the [University of Basel](https://www.unibas.ch/en.html), and is supported by the [Swiss Academy of Humanities and Social Sciences](http://www.sagw.ch/en/sagw.html).

Knora is [free software](http://www.gnu.org/philosophy/free-sw.en.html), released under the [GNU Affero General Public License](http://www.gnu.org/licenses/agpl-3.0.en.html) and available at [github](https://github.com/dhlab-basel/Knora).

### Features

* Stores humanities data as industry-standard [RDF](http://www.w3.org/TR/2014/NOTE-rdf11-primer-20140624/) graphs, plus files for binary data such as digitized primary sources.
    * Designed to work with any standards-compliant RDF triplestore. Tested with [Ontotext GraphDB](http://ontotext.com/products/graphdb/).
* Based on [OWL](http://www.w3.org/TR/2012/REC-owl2-primer-20121211/) ontologies that express abstract, cross-disciplinary commonalities in the structure and semantics of research data.
* Offers a generic HTTP-based API, implemented in [Scala](http://www.scala-lang.org/), for querying, annotating, and linking together heterogeneous data in a unified way.
    * Handles authentication and authorization.
    * Provides automatic versioning of data.
* Uses [Sipi](http://www.sipi.io/), a high-performance media server implemented in C++.
* Designed to be be used with [SALSAH](https://dhlab-basel.github.io/Salsah/), a general-purpose, browser-based virtual research environment,
  as well as with custom user interfaces.
