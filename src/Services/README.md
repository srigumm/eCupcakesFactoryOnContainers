## Background Services (with signalr endpoints)

![castle cupcakes](https://raw.githubusercontent.com/srigumm/eCupcakesFactoryOnContainers/master/img/cupcakecookingalgorithm.png)

These services continually monitors KAFKA topics and push notifications to all connected clients(i.e react-ui here) about the newly received orders/updates to existing orders.

- **"Mixer Service"**
- **"Bake Service"**
- **"Decoration Service"**
- **"Box Service"**

### Prerequisites:
- VSCODE or some .net code editor
- .NET Core 2.2
- Docker&Docker-Compose
- Kafka Installation and Topics setup
- Kafkacat command line tool

## Run:
1. Clone this repository:

       git clone https://github.com/srigumm/eCupcakesFactoryOnCotainers.git
       cd eCupcakesFactoryOnCotainers/src/Api

2. Running in Local Machine using Docker:

    **Mixer**:
        
        docker build -t hostedservice.mixer -f src/Services/Service.Mixing/Dockerfile .
        docker run --name mixercontainer -p 5001:5001 hostedservice.mixer

        (or)

        cd src/Services/Service.Mixing
        dotnet run
    
    **Baker**:
        
        docker build -t hostedservice.baker -f src/Services/Service.Baking/Dockerfile .
        docker run --name bakercontainer -it --rm -p 5002:5002 hostedservice.baker

        (or)

        cd src/Services/Service.Baking
        dotnet run
    
    **Decorator**:
        
        docker build -t hostedservice.decorator -f src/Services/Service.Decorating/Dockerfile .
        docker run --name decoratorcontainer  -p 5003:5003 hostedservice.decorator

        (or)

        cd src/Services/Service.Decorating
        dotnet run

    **Packaging**:
        
        docker build -t hostedservice.packaging -f src/Services/Service.Packaging/Dockerfile .
        docker run --name packagingcontainer  -p 5004:5004 hostedservice.packaging

        (or)

        cd src/Services/Service.Packaging
        dotnet run


### SingnalR Endpoint&Actions:

Mixing Service:

    http://localhost:5001/ordermonitorhub
    Action Name: "InformNewOrderToMix"

Baking Service:

    http://localhost:5002/ordermonitorhub
    Action Name: "InformNewOrderToBake"

Decoration Service:

    http://localhost:5003/ordermonitorhub
    Action Name: "InformNewOrderToDecorate"

Packaging Service:

    http://localhost:5004/ordermonitorhub
    Action Name: "InformNewOrderToPackage"

**Note**: *why do we need SignalR here? Though Kafka is pub/sub system, there is no direct browser client available. So we need something like SignalR to push these notifications to UI clients.*


## Test:

### How to verify?

I. Build a react application and add the below code:
        
    componentDidMount = () => {
        const hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl("http://localhost:5001/ordermonitorhub?consumergroup=bostonbeach&topic=orderrequests")
            .configureLogging(SignalR.LogLevel.Information)
            .build();
        
        this.setState({ hubConnection }, () => {
            hubConnection.start().then(function () {
                console.log("connected");
                
            }).catch(err => console.log('Error while establishing connection :('));
        });

        hubConnection.on('InformNewOrderToMix', (receivedMessage) => {
            console.log(receivedMessage);
            //process message.
        });
        
*Note: for signalr endpoint you need to pass the "consumer group" and "topic" names.* (use below ones directly)
    
    Ex: 
            http://localhost:5001/ordermonitorhub?consumergroup=bostonbeach&topic=orderrequests
            http://localhost:5002/ordermonitorhub?consumergroup=bostonbeach&topic=readytobake
            http://localhost:5003/ordermonitorhub?consumergroup=bostonbeach&topic=readytodecorate
            http://localhost:5004/ordermonitorhub?consumergroup=bostonbeach&topic=readytobox

II. Troubleshooting:

         docker run -it <<ContainerName> /bin/bash

         Look at console for messages like "Connections count: <<number>>" if signalr server is recieveing incoming connections 