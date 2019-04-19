using Api.Models;
using MediatR;
namespace Api.Commands
{
    public class PlaceNewOrderCommand : IRequest<OrderAcknowledgment>
    {
        public OrderRequest Order { get; }

        public PlaceNewOrderCommand(OrderRequest order)
        {
            this.Order = order;
        }
    }
    
}