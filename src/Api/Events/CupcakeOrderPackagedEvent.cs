using MediatR;
using System;
using Api.Models;
namespace Api.Events
{
    public class CupcakeOrderPackagedEvent : INotification
    {
        public BoxedOrder Order { get; }

        public CupcakeOrderPackagedEvent(BoxedOrder order)
        {
            this.Order = order;
        }
    }
}