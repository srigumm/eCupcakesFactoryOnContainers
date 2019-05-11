# KAFKA Connector - using "hpgrahsl-kafka-connect-mongodb" connector to export KAFKA topics data to mongo db

### hpgrahsl-kafka-connect-mongodb:


A Kafka Connect MongoDB Sink Connector available as part of confluent connector plugins
https://www.confluent.io/connector/kafka-connect-mongodb-sink/

**For more details about the plugin owners,visit https://github.com/hpgrahsl/kafka-connect-mongodb

# How to run this connector in local docker container?

### 1: Start your kafka server and setup your topics.
### 2: Start Mongodb server
### 3: Update "MongoDbSinkConnector.properties"   file 
    - topic names
    - kafka broker names
    - mongodb connection details
    - mongodb collection names
    - key,value converters if any.

    Path: src/kafka-mongodb-connector/MongoDbSinkConnector.properties
### 3: Build docker image in local docker repository
    - cd <<root>> i.e cd eCupcakesFactoryOnContainers
    - Run => "docker build -t customconnector -f src/kafka-mongodb-connector/Dockerfile . --no-cache"
### 4: Create a container based on the docker image created in step#3
    - docker run -it customconnector

### 5: Verify if the connector is working

    produce some messages to the configured topics:
        kafkacat -b localhost:9092 -t "<<topicname>>" _P
    verify mongodb collection
        db.<<collectioname>>.find();

# How to run this connector in local machine?
### 1: Start your kafka server and setup your topics.
### 2: Start Mongodb server
### 3: Install connector from confluent hub to your local box
    - confluent-hub install --no-prompt hpgrahsl/kafka-connect-mongodb:1.3.1
    (this would suggest you to install in the default confluent installation folders)

    - update this path in "plugin.path" setting in "MongoDbSinkConnector.properties" file

        ex: plugin.path=/usr/share/java,/usr/share/confluent-hub-components

    - Run the below command confluent installation directory: 
    "./bin/connect-standalone <<path to MongoDbSinkConnector.properties>> <<path to MongoDbSinkConnector.properties>> 

    Note: here, I have merge both worker.properties connector.properties settings into MongoDbSinkConnector.properties, you can split and pass two config files also.
 