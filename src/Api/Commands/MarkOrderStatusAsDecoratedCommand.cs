using Api.Models;
using MediatR;
namespace Api.Commands
{
    public class MarkOrderStatusAsDecoratedCommand : IRequest<bool>
    {
        public DecoratedOrder Order { get; }

        public MarkOrderStatusAsDecoratedCommand(DecoratedOrder order)
        {
            this.Order = order;
        }
    }
    
}