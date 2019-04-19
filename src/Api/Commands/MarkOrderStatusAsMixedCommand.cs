using Api.Models;
using MediatR;
namespace Api.Commands
{
    public class MarkOrderStatusAsMixedCommand : IRequest<bool>
    {
        public MixedOrder Order { get; }

        public MarkOrderStatusAsMixedCommand(MixedOrder order)
        {
            this.Order = order;
        }
    }
    
}