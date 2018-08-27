## Quickstart for the NIE-INE software-suite 
#### Consisting of nieOS & nieOntologies with the DaSCH-stack (Knora, Salsah, Sipi and GraphDB) 

### Prerequisites:
 - Install Docker. If you use a Linux distribution, you might have to install docker-compose as well.
 - You need to have 20GB of free storage
 - You might need to install "expect" for step 5. Check if you have it installed: <pre>expect -v</pre>
 - If you use Mac OS X: Increase Memory and CPUs that Docker is allowed to use. It works with 10 GB, maybe less as well.
	 - 	Mac: Go to Docker > Preferences > Advanced
	 - If images stop running without an explanation, you might need to increase the memory a little bit more.

### 1. Fast and recommended quickstart-choice, download docker-images from docker-hub
 - Clone the repository:
    <pre>git clone git@github.com:nie-ine/suite-quickstart.git</pre>
 - Map the name "sipi" to the ip address of localhost, e.g. next to localhost the name "sipi" should be mapped to the same ip adress as localhost:
    <pre>sudo vi /etc/hosts</pre> 
    The file should contain the following lines after you added the second line:
    <pre>127.0.0.1 localhost</pre>
    <pre>127.0.0.1 sipi</pre>
 - Change directory to ```/stable-releases/<latest-release>``` and run:
  
    ```
    docker-compose up
    ```
  
    This will start all parts of the software-suite via Docker.
  
 - You might have to restart Knora manually, since GraphDB might take too long to start. After GraphDB is ready (it will say ```Started GraphDB in workbench mode at port 7200```) you restart Knora with the following command:
 
    ```
    docker restart <containerIDforKnora>
    ``` 
 
    You can find the ```containerIDforKnora``` by typing ```docker ps```.
 
 
### 2. Slow quickstart-choice, built docker-images locally from scratch
- Clone the repository:
   <pre>git clone --recursive git@github.com:nie-ine/suite-quickstart.git</pre>
- map Sipi to the localhost-ip as described in the fast alternative
- Git clone Knora in the folder ```/Knora```
- Change hostname for GraphDB to "graphdb" and Sipi to "sipi" in ```/Knora/Knora/webapi/src/main/resources/application.conf``` (both are localhost before this change)
- run ```docker-compose up``` in the main directory

### Test your suite
Change the label in the python script on line 10 to an individual name. To execute the import script in ```/ImportPictureTest``` you need python3 and pip3 package manager and the pypthon3 package "requests" which you can install in the following way:

<pre>pip3 install requests</pre> 

Execute the script:

<pre>python3 import.py</pre> 

If you get a json with the resource description back from Knora after executing the code and if you can find the resource and the picture in Salsah using the full text search searching for the given label, your setup is working.


### If you would like to import your own ontology
 - Execute your import-script that you use with Knora, just like you would import ontologies to a running Knora-instance
 - Restart Knora. Run ```docker ps``` to find containerID of the Knora-container. Then type ```docker restart <containerIDforKnora>``` to restart Knora, so that Knora runs through your imported ontology


### If you would like to stop the containers:

 - If you press ```ctrl+c``` twice, Docker will force containers to stop, the containers won't be deleted though. Since the imported data for the triple store is not saved persistently yet, this option saves the data in the container as well.
 - ```docker-compose down``` stops and deletes all containers.
