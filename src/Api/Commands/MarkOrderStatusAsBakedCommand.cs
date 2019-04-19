using Api.Models;
using MediatR;
namespace Api.Commands
{
    public class MarkOrderStatusAsBakedCommand : IRequest<bool>
    {
        public BakedOrder Order { get; }

        public MarkOrderStatusAsBakedCommand(BakedOrder order)
        {
            this.Order = order;
        }
    }
    
}