using MediatR;
using System;
using Api.Models;
namespace Api.Events
{
    public class CupcakeOrderDecoratedEvent : INotification
    {
        public DecoratedOrder Order { get; }

        public CupcakeOrderDecoratedEvent(DecoratedOrder order)
        {
            this.Order = order;
        }
    }
}