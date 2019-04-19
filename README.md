# Cupcakes Factory - usecase to demonstrate even streaming using KAFKA

### User Scenario:


Implementation of user scenario mentioned in Bill's medium blog on event streaming.
https://blog.usejournal.com/why-are-you-still-doing-batch-processing-etl-is-dead-3dac2392a772

![castle cupcakes](https://raw.githubusercontent.com/srigumm/KafkaEventStreamingSimulation/master/cupcakes.ui/src/images/castlecupcakes.png)

![architecture diagram](https://raw.githubusercontent.com/srigumm/KafkaEventStreamingSimulation/master/cupcakes.ui/src/images/cookingprocess.png)

 To address scaling individual apps and other performance related key metrics, lets assume that we have decided to build the below two critical components
  - An Order API(RESTful) that takes users orders and responds back immediately with some acknowledgement info.
  - Below background services that actually process these order requests.
    - "Mixer Service"
    - "Bake Service"
    - "Decoration Service"
    - "Box Service"
  - A SignalR endpoint with the below events, UI layer subscribes to these events to get the notifications.

         "http://localhost:5002/ordermonitorhub"
        
        "InformNewOrderToBake"
        "InformNewOrderToMix"
        "InformNewOrderToDecorate"
        "InformNewOrderToPackage"


### Prerequisites:

 - VSCODE or some .net code editor
 - .NET Core 2.2
 - Docker
 - KAFKA Installation and Topics setup
 - Kafkacat command line tool
 - If you are connecting to Kerberos-aware KAFKA Enterprise Instance, ensure the below things:
    - Setup krb5.Conf file  with your organization's KDC details.
    - Keep krb5.conf file in default path i.e /etc/ or specify the path with KRB5_CONFIG environment variable.
    - Create Keytab file with your principal
    - Make sure your/service account has atleast read access to krb5.conf file.

### How to install KAFKA in local??
- It's easy to setup KAFKA in local using docker containers.
  Clone the below below repository and run "docker-compose up" command.
        commands:

             git clone https://github.com/TribalScale/kafka-waffle-stack.git
             cd kafaka-waffle-stack
             docker-compose up
   Above instructions should start a KAFKA server, and you can use the broker localhost:9092 to produce/consumer messages.
- Creating a new topic in local KAFKA:
    producing a sample message to a topic using kafkacat utility would create topic if it doesn't exist.
    so, run the below command and give some sample message like {"id":1234,"productname":"Unicorn Whistles","quantity":3}

       kafkacat -b localhost:9092 -t new_topic -P

### Implementation:

- Implemented a dotnetcore-WebApi post handler to capture user's order requests.( into "orderrequests" kafka topic)
- Implemented background services(HostedService in .NET core) that process the user's order requests from source topic and writes to next kafka topic.

### Run & Test:
1. Clone this repository:

       git clone https://github.com/srigumm/KafkaEventStreamingSimulation.git
       cd <<folder>>
2. Create Kafka Topics(use kafkacat util):

        "orderrequests"
        "readytobake"
        "readytodecorate"
        "readytobox"
        "readytoship"

        Example:
        kafkacat -b localhost:9092 -t orderrequests -P

3. Start Order-Api REST service:  
        
       cd Api
       dotnet restore
       dotnet build
       dotnet run

      This should start  webserver for our webapi rest service.

        WebApi URL: http://localhost:5000/api/order

4. Start background Services:

    
        cd Service.Mixing
        dotnet run

        cd Service.Baking
        dotnet run

        cd Service.Decorating
        dotnet run

        cd Service.Packaging
        dotnet run

5. Start React UI

        cd cupcakes.ui
        npm start
        

6. Verify if new messages were written to topics using kafkacat utility:

       kafkacat -b localhost:9092 -t orderrequests -C
       kafkacat -b localhost:9092 -t readytobake -C
       kafkacat -b localhost:9092 -t readytodecorate -C
       kafkacat -b localhost:9092 -t readytobox -C
       kafkacat -b localhost:9092 -t readytoship -C
7. How to verify individual API calls?

        I. Submitting a new order:
        
        Curl -i -H "Content-Type: application/json" -X POST -d '{"Order":{"Flavour":"Cookies","Quantity":11}}' http://localhost:5000/api/v1/order

        Expected Response:
        {
                "correlationId": "834fea52-c476-4469-8c7d-8efd15d38d9e",
                "acknowledgment": "Recieved your order!! Estimated time to process is 10mins",
                "createdOn": "05/04/2019 19:24",
                "order": {
                        "id": 0,
                        "flavour": "Cookies",
                        "size": 0,
                        "quantity": 11
                }
        }

        II. Updating order as mixed:

        Curl -i -H "Content-Type: application/json" -X POST -d '{"Order":{"Flavour":"Cookies","Quantity":11,"MixedBy":"Tom","MixedOn":"05/04/2019 02:05PM"}}' http://localhost:5000/api/v1/order/mix

        Expected Response:

        200 OK

        III. Updating order as baked:

        Curl -i -H "Content-Type: application/json" -X POST -d '{"Order":{"Id":123,"Flavour":"Cookies","Quantity":11,"MixedBy":"Tom","MixedOn":"05/04/2019 02:05PM",
        "BakedBy":"Harry","BakedOn":"05/04/2019 02:10PM"}}' http://localhost:5000/api/v1/order/bake

        Expected Response:

        200 OK

        IV. Updating order as decorated:

        Curl -i -H "Content-Type: application/json" -X POST -d '{"Order":{"Id":123,"Flavour":"Cookies","Quantity":11,"MixedBy":"Tom","MixedOn":"05/04/2019 02:05PM",
        "BakedBy":"Harry","BakedOn":"05/04/2019 02:10PM",
        "DecoratedBy":"James","DecoratedOn":"05/04/2019 02:15PM"}}' http://localhost:5000/api/v1/order/decorate

        Expected Response:

        200 OK

        V. Updating order as packaged:

        Curl -i -H "Content-Type: application/json" -X POST -d '{"Order":{"Id":123,"Flavour":"Cookies","Quantity":11,"MixedBy":"Tom","MixedOn":"05/04/2019 02:05PM",
        "BakedBy":"Harry","BakedOn":"05/04/201902:10PM",
        "DecoratedBy":"James","DecoratedOn":"05/04/2019 02:15PM",
        "PackagedBy":"Bill",
        "PackagedOn":"05/04/2019 02:20PM"}}' http://localhost:5000/api/v1/order/box

        Expected Response:

        200 OK



### Troubleshooting tips:
- If your producer/consumer is not responding at all, then verify your keytab file with below steps

      kinit username@MYDOMAIN.COM -k -t username.keytab
    you should get authenticated successfully (without being prompted for a password).
