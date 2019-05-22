# Order Api:

RESTful Api that takes users orders and responds back immediately with some acknowledgement info.

- **api/v1/order** → (to place a new order)
- **api/v1/order/mix** → (to update the current order as mixed)
- **api/v1/order/bake** → (to update the current order as baked)
- **api/v1/order/decorate** →(to update the current order as decorated)
- **api/v1/order/box** →(to update the current order as packaged)


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

       "docker-compose up" 

       (or)

       docker build -t ordermicroservice -f src/Api/Dockerfile .
       docker run --name ordercontainer -it --rm -p 5000:5000 ordermicroservice

       (or)

       cd Api
       dotnet run

 
    
3. on successful run, you can access your Api methods at the below endpoints:

       create new order: http://localhost:5000/api/v1/order
       updating order as :
        mixed: http://localhost:5000/api/v1/order/mix
        baked: http://localhost:5000/api/v1/order/bake
        decorated: http://localhost:5000/api/v1/order/decorate
        packaged: http://localhost:5000/api/v1/order/box 


## Test:

### How to verify individual API calls?

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