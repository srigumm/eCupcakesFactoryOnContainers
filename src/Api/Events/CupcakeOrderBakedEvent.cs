using MediatR;
using System;
using Api.Models;
namespace Api.Events
{
    public class CupcakeOrderBakedEvent : INotification
    {
        public BakedOrder Order { get; }

        public CupcakeOrderBakedEvent(BakedOrder order)
        {
            this.Order = order;
        }
    }
}