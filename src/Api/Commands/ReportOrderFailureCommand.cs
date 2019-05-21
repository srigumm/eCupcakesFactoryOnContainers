using Api.Models;
using MediatR;
namespace Api.Commands
{
    public class ReportOrderFailureCommand : IRequest<OrderAcknowledgment>
    {
        public OrderRequest Order { get; }

        public ReportOrderFailureCommand(OrderRequest order)
        {
            this.Order = order;
        }
    }
    
}