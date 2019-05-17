# KAFKA CDC Source Connector - using "Debezium CDC Connector " to import mongodb data into kafka topics

### Debezium CDC Connector for MongoDB:


A Kafka CDC connector to source data from MongoDB Cluster, available as part of confluent connector plugins
https://www.confluent.io/connector/debezium-mongodb-cdc-connector/

**For more details about the plugin owners,visit https://debezium.io/docs/connectors/mongodb/

# How to run this connector in local docker container?

### 1: Start your kafka server
### 2: Standup Mongodb clusters(replicaset) and update the below setting in scripts/cdcsetup.sh
        - "mongodb.hosts": "rs0/mongo1:27017",
        - "mongodb.name": "rawmaterial",
        - "database.whitelist": "inventory" (**your database here **)
        
        Note: you can use our docker-compose file to spinup a new mango cluster along with connectors.

    Path: src/kafka-mongo-import-export/scripts/mongoclustersetup.sh

    Note: cdcsetup.sh has a curl POST call that issues a "create new connector" instruction to the existing connector process(running on 8083)
### 3: Build docker images&containers in local docker repository
    - cd <<root>> i.e cd eCupcakesFactoryOnContainers
    - Run => "docker-compose up"

    Note: our docker-compose file would standup a new mongodb replicaset, starts the kafka connector process(on 8083) and runs a source connector for importing mongodata.

### 4: Verify whether the connector works or not.

    Create some collections in the configured mongodb(i.e inventory as per the step2) cluster(on primary node):
        use inventory
        db.ingredients.insert({"Id":132,"Flavour":"Cookies","Quantity":11})

        
    verify kafka if a new topic topic got created:
        When this connector runs successfully, it creates new topics in kafa with the below name format: 
        <<logicalname>>.<<dbname>>.<<collectioname>>
        
        ex: as per the configuration in step2, new topic name that gets created is - rawmaterial.inventory.<<collectioname>>
### 5. Cleanup => Kill your containers when you are done.
    docker-compose down
    docker-compose rm

 