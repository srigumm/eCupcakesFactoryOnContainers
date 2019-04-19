using MediatR;
using System;
using Api.Models;
namespace Api.Events
{
    public class CupcakeOrderBatterMixedEvent : INotification
    {
        public MixedOrder Order { get; }

        public CupcakeOrderBatterMixedEvent(MixedOrder order)
        {
            this.Order = order;
        }
    }
}