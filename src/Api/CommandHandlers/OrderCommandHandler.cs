using Api.Commands;
using Api.Events;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Api.Models;
using System;

namespace Api.CommandHandlers
{
    public class OrderCommandHandler : IRequestHandler<PlaceNewOrderCommand,OrderAcknowledgment>,
                                        IRequestHandler<MarkOrderStatusAsMixedCommand,bool>,
                                        IRequestHandler<MarkOrderStatusAsBakedCommand,bool>,
                                        IRequestHandler<MarkOrderStatusAsDecoratedCommand,bool>,
                                        IRequestHandler<MarkOrderStatusAsPackagedCommand,bool>
    {
        private readonly IMediator _mediator;
        public OrderCommandHandler(IMediator mediator)
        {
            this._mediator = mediator;
        }
        public async Task<OrderAcknowledgment> Handle(PlaceNewOrderCommand cmd, CancellationToken cancellationToken)
        {
            //Create required events for this action and publish them
            var newOrderRecievedEvent = new CupcakeNewOrderRecievedEvent(cmd.Order);
            await _mediator.Publish(newOrderRecievedEvent);

            var acknowledgementInfo = new OrderAcknowledgment(){
                                            CorrelationId=Guid.NewGuid(),
                                            Acknowledgment="Recieved your order!! Estimated time to process is 10mins",
                                            CreatedOn=DateTime.Now.ToString("MM/dd/yyyy HH:mm"),
                                            Order = cmd.Order
                                        };

           return acknowledgementInfo;
        }

        public async Task<bool> Handle(MarkOrderStatusAsMixedCommand cmd, CancellationToken cancellationToken)
        {
            //TODO::Verify if there is any order request with the input order
            // If no, reject command 

            //Create required events for this action and publish them
            var mixedEvent = new CupcakeOrderBatterMixedEvent(cmd.Order);
            await _mediator.Publish(mixedEvent);
            return true; //send acknowledgement as "true"(command accepted)
        }

        public async Task<bool> Handle(MarkOrderStatusAsBakedCommand cmd, CancellationToken cancellationToken)
        {
            //TODO::Verify if there is any order request with the input order
            // If no, reject command 

            //Create required events for this action and publish them
            var bakedEvent = new CupcakeOrderBakedEvent(cmd.Order);
            await _mediator.Publish(bakedEvent);
            return true; //send acknowledgement as "true"(command accepted)
        }

        public async Task<bool> Handle(MarkOrderStatusAsDecoratedCommand cmd, CancellationToken cancellationToken)
        {
            //TODO::Verify if there is any order request with the input order
            // If no, reject command 

            //Create required events for this action and publish them
            var decoratedEvent = new CupcakeOrderDecoratedEvent(cmd.Order);
            await _mediator.Publish(decoratedEvent);
            return true; //send acknowledgement as "true"(command accepted)
        }

        public async Task<bool> Handle(MarkOrderStatusAsPackagedCommand cmd, CancellationToken cancellationToken)
        {
            //TODO::Verify if there is any order request with the input order
            // If no, reject command 

            //Create required events for this action and publish them
            var boxedEvent = new CupcakeOrderPackagedEvent(cmd.Order);
            await _mediator.Publish(boxedEvent);
            return true; //send acknowledgement as "true"(command accepted)
        }
    }
}