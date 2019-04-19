using MediatR;
using System;
using Api.Models;
namespace Api.Events
{
    public class CupcakeNewOrderRecievedEvent : INotification
    {
        public OrderRequest Order { get; }

        public CupcakeNewOrderRecievedEvent(OrderRequest order)
        {
            this.Order = order;
        }
    }
}