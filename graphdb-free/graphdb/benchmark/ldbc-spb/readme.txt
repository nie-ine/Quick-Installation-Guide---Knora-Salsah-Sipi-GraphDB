LDBC Semantic Publishing Benchmark
----------------------------------

Required Software :  

	- Java Develpment Kit 1.6+
	- Apache Ant 
	- Git


Using the Benchmark Software : 

1. Start a local GraphDB server
	
	- Create a new repository having : 

		- repository id      : ldbc1
		- rule-set 	         : RdfsRules-optimized-spb.pie (provided with SPB distribution)
		- context index      : enabled
		- cache-memory       : 2G+
		- tuple-index-memory : 2G


2. Download and Build the LDBC Semantic Publishing Benchmark Driver
	
	- execute script : ldbc-spb-download.sh


3. Generate and load datasets
	
	- execute script : ldbc-spb-generate.sh
	
	
4. Enable geospatial index:
    - execute update query on the ldbc1 repository:
    
        PREFIX ontogeo: <http://www.ontotext.com/owlim/geo#>
        INSERT DATA { _:b1 ontogeo:createIndex _:b2. }
        
        
5. Enable Lucene-index:
    - execute update query on the ldbc1 repository:
    
        PREFIX luceneConnector: <http://www.ontotext.com/connectors/lucene#>
        PREFIX inst: <http://www.ontotext.com/connectors/lucene/instance#>
        INSERT DATA {
            inst:cwLuceneConnectorIndex luceneConnector:createConnector '''
        {
              "types": [
                "http://www.bbc.co.uk/ontologies/creativework/CreativeWork"
              ],
              "fields": [
                {
                  "fieldName": "title",
                  "propertyChain": [
                    "http://www.bbc.co.uk/ontologies/creativework/title"
                  ],
                  "facet": false,
                  "stored": false
                },
                {
                  "fieldName": "description",
                  "propertyChain": [
                    "http://www.bbc.co.uk/ontologies/creativework/description"
                  ],
                  "facet": false,
                  "stored": false
                },
                {
                  "fieldName": "dateModified",
                  "propertyChain": [
                    "http://www.bbc.co.uk/ontologies/creativework/dateModified"
                  ],
                  "stored": false,
                  "multivalued": false,
                  "facet": false
                }
              ]
            }
            ''' .
        }


6. Run the benchmark

	- execute script : ldbc-spb-benchmark.sh
