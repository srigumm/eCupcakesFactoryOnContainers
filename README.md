# eCupcakesFactoryOnCotaners - usecase to demonstrate containerized microservices using .Net Core and Kafka.

**"eCupcakesFactoryOnContainers"** is based on a simplified **"Microservices"** architecture and docker containers. Core intent of this reference application is to provide reference implementation for .Net developers to easily get started with containerized microservices using **.Net Core** and **Kafka**.

### What is eCupcakesFactory ??
It's a fictional cupcake factory usecase mentioned in my colleague William Scott's [blog post](https://blog.usejournal.com/why-are-you-still-doing-batch-processing-etl-is-dead-3dac2392a772) on event streaming, please read his blogpost before you start looking into this sample codebase.

- To simplify things, our focus will be only on just ordering "Cupcakes" with very few flavors, modifying the order and cancelling the order scenarios are out of scope for this blog. 
- When users visit our eCupcakeFactory application, they could order one or more cupcakes, and the kitchen staff would immediately get notified about these new orders. 
- Below are the main steps involved in preparing user order:
  - **Mixing**: Involves preparing the cupcake batter with right ingredients.
  - **Baking**: once the mixed batter is available, we pour it in evenly into liners and bake cupcakes in a preheated oven.
  - **Decorating**: once cupcakes are completely cooled, we can frost and decorate them as simply or creatively.
  - **Packaging/Boxing**: packaging the right size box and packaging the order.
  - **Shipping**: delivering the order.


![castle cupcakes](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/castlecupcakes.png)

### Architecture:

![architecture diagram](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/architecture-diagram.png)

- It's an event driven architecture implementation with multiple **micro-services**(some are background services)  each having its own responsibility and configured to respond on certain events like "NewOrderRecieved","OrderBaked","OrderMixed" etc. 
- Microservices implemented with coding patterns/practices like **CQRS**(using MediatR Framework),multi route WebApi controllers etc.
- Used **Kafka** as message broker for communication b/w these micro services, also leveraged Kafka as **persistent datastore**. 
- Used confluent's **"kafka connect"** sink and CDC plugins to import/export data to/from "MongoDB".
- **React-Redux** architecture for client apps, used http as the communication protocol between the client react apps and the microservices.
- Used **SignalR hubs** for notifying react client applications about the data updates.

**Note**: *we haven't implemented ApiGateway yet, but it will be added in future releases. Right now all Apis/Services are accessed directly from UI.* 

### Technology Stack:
- .Net Core
- Confluent Kafka Cloud
- Confluent Kafka Connect
- SingalR
- React-Redux
- Docker
- Kubernetes* 

Notes: Kubernetes implementation is in "gcpmigation" branch of this repository.

### Prerequisites:
- VSCODE or some .net code editor
- .NET Core 2.2
- Docker&Docker-Compose
- Kafka Installation and Topics setup
- Kafkacat command line tool

### How to install KAFKA in local??
- Download and Start Confluent Platform: https://docs.confluent.io/current/quickstart/ce-quickstart.html
- Using docker: It's easy to setup KAFKA in local using docker containers.
  Clone the below below repository and run "docker-compose up" command.commands:

        Commands:
        
        git clone https://github.com/confluentinc/cp-docker-images
        cd cp-docker-images
        git checkout 5.2.1-post
        cd examples/cp-all-in-one/
        docker-compose up -d --build
   
   Above instructions should start a KAFKA server, and you can use the broker localhost:9092 to produce/consumer messages.
- Creating a new topic in local KAFKA:
    producing a sample message to a topic using kafkacat utility would create topic if it doesn't exist.
    
       kafkacat -b localhost:9092 -t new_topic -P



## User Scenarios & Flow of events:

![userscenarios](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/userscenarios-diagram.png)


## Components
### Order Api: 
RESTful Api that takes users orders and responds back immediately with some acknowledgement info.

- **api/v1/order** → (to place a new order)
- **api/v1/order/mix** → (to update the current order as mixed)
- **api/v1/order/bake** → (to update the current order as baked)
- **api/v1/order/decorate** →(to update the current order as decorated)
- **api/v1/order/box** →(to update the current order as packaged)

Example:

    Curl -i -H "Content-Type: application/json" -X POST -d '{"Order":{"Flavour":"Strawberry","Quantity":1,"Size":1}}' http://localhost:5000/api/v1/order

    **Refer src/Api/README.md for more details.

### Background Services (with signalr endpoint)

![castle cupcakes](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/cupcakecookingalgorithm.png)

These services continually monitors KAFKA topics and push notifications to all connected clients(i.e react-ui here) about the newly received orders/updates to existing orders.

- **"Mixer Service"**
- **"Bake Service"**
- **"Decoration Service"**
- **"Box Service"**

SingnalR Endpoint&Actions:

    http://localhost:5002/ordermonitorhub

    "InformNewOrderToBake"
    "InformNewOrderToMix"
    "InformNewOrderToDecorate"
    "InformNewOrderToPackage"

**Note**: *why do we need SignalR here? Though Kafka is pub/sub system, there is no direct browser client available. So we need something like SignalR to push these notifications to UI clients.*

### Web Client (React-Redux application)
Provides web interfaces

- **Customers**: simple UI to place new orders
- **KitchenStaff**: simple UI to update the order status.
- **Admins**: Dashboard UI 
  
urls:

     customer: http://localhost:3000/create
     mixer: http://localhost:3000/mixer
     baker: http://localhost:3000/baker
     decorator: http://localhost:3000/decorator
     packaging team: http://localhost:3000/packaging
     Admins:
     http://localhost:3000/dashboard

### Kafka-Mongo-Connector:
*Refer src/kafka-mongodb-connector/README.md for more details.*
 
### Mongo-To-Kafka-CDC:
*Refer kafka-mongod-cdc/README.md for more details.*

## Run & Test:
1. Clone this repository:

       git clone https://github.com/srigumm/eCupcakesFactoryOnCotainers.git
       cd eCupcakesFactoryOnCotainers
2. Install kafka and create kafka topics(use control-center or kafkacat util):

        "orderrequests"
        "readytobake"
        "readytodecorate"
        "readytobox"
        "readytoship"

        Example:
        kafkacat -b localhost:9092 -t orderrequests -P

3. Running in Local Machine using Docker:

       "docker-compose up"
    
    executing this command at root directory should be enough to start the whole system ( it builds all required docker images and containers in localbox).

on successful run, you can access your UI/Services at the below endpoints:

<script src="https://gist.github.com/sgummadidala/a4de154e56b6b747289c1e82d548e2b7"></script>

## UI Screens:

### Login:
![Mixer UI](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/ui/login.png)

### Place a new order:
![place new order](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/ui/createorder.png)

### Mixer:
![Mixer UI](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/ui/mixer.png)

### Baker:
![Baker UI](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/ui/baker.png)

### Decorator:
![Baker UI](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/ui/decorator.png)

### Packaging:
![Packaging UI](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/ui/packaging.png)

### Dashboard:
![Dashboard UI](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/ui/dashboard.png)