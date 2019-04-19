using MediatR;
using Api.Events;
using System.Threading;
using System.Threading.Tasks;
using System;
using Confluent.Kafka;
using Newtonsoft.Json;
using Api.KafkaUtil;
namespace Api.EventHandlers
{
    public class OrderEventHandler : INotificationHandler<CupcakeNewOrderRecievedEvent>,
                                    INotificationHandler<CupcakeOrderBatterMixedEvent>,
                                    INotificationHandler<CupcakeOrderBakedEvent>,
                                    INotificationHandler<CupcakeOrderDecoratedEvent>,
                                    INotificationHandler<CupcakeOrderPackagedEvent>
    {
        private readonly ProducerConfig _config;

        public OrderEventHandler(ProducerConfig config )
        {
            this._config = config;
        }
        public async Task Handle(CupcakeNewOrderRecievedEvent newOrderEvent,CancellationToken cancellationToken)
        {
           Console.WriteLine($"Hanlding event - {nameof(CupcakeNewOrderRecievedEvent)} ");
           //Serialize 
            string serializedOrder = JsonConvert.SerializeObject(newOrderEvent.Order);
            var producer = new ProducerWrapper(this._config,"orderrequests");
            await producer.writeMessage(serializedOrder);
        }

        public async Task Handle(CupcakeOrderBatterMixedEvent mixedEvent,CancellationToken cancellationToken)
        {
           Console.WriteLine($"Hanlding event - {nameof(CupcakeOrderBatterMixedEvent)} ");
           //Serialize 
            string serializedOrder = JsonConvert.SerializeObject(mixedEvent.Order);
            var producer = new ProducerWrapper(this._config,"readytobake");
            await producer.writeMessage(serializedOrder);
        }

        public async Task Handle(CupcakeOrderBakedEvent bakedEvent,CancellationToken cancellationToken)
        {
           Console.WriteLine($"Hanlding event - {nameof(CupcakeOrderBakedEvent)} ");
           //Serialize 
            string serializedOrder = JsonConvert.SerializeObject(bakedEvent.Order);
            var producer = new ProducerWrapper(this._config,"readytodecorate");
            await producer.writeMessage(serializedOrder);
        }

        public async Task Handle(CupcakeOrderDecoratedEvent decoratedEvent,CancellationToken cancellationToken)
        {
           Console.WriteLine($"Hanlding event - {nameof(CupcakeOrderDecoratedEvent)} ");
           //Serialize 
            string serializedOrder = JsonConvert.SerializeObject(decoratedEvent.Order);
            var producer = new ProducerWrapper(this._config,"readytobox");
            await producer.writeMessage(serializedOrder);
        }

        public async Task Handle(CupcakeOrderPackagedEvent boxedEvent,CancellationToken cancellationToken)
        {
           Console.WriteLine($"Hanlding event - {nameof(CupcakeOrderPackagedEvent)} ");
           //Serialize 
            string serializedOrder = JsonConvert.SerializeObject(boxedEvent.Order);
            var producer = new ProducerWrapper(this._config,"readytoship");
            await producer.writeMessage(serializedOrder);
        }
    }    
}