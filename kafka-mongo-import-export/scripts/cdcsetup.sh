#!/bin/bash
apt-get update && apt-get install -y iputils-ping
connectendpoint=`ping -c 1 connect | head -1  | cut -d "(" -f 2 | cut -d ")" -f 1`

 
echo "**********************************************" ${connectendpoint}
echo "Waiting for startup.."
until $(curl -s -o /dev/null -w ''%{http_code}''  http://connect:8083/connectors) != "200" do
  printf '.'
  sleep 1
done

echo "Started.."

echo cdcsetup.sh time now: `date +"%T" `

#create connector
curl -i -X POST -H 'Accept:application/json' -H  'Content-Type:application/json' http://connect:8083/connectors/ -d <<EOF
{
    "name": "mongodb-connector",
    "config": {
      "connector.class": "io.debezium.connector.mongodb.MongoDbConnector",
      "mongodb.hosts": "rs0/mongo1:27017",
      "mongodb.name": "rawmaterial",
      "database.whitelist": "inventory"
    }
}

EOF