using Api.Models;
using MediatR;
namespace Api.Commands
{
    public class MarkOrderStatusAsPackagedCommand : IRequest<bool>
    {
        public BoxedOrder Order { get; }

        public MarkOrderStatusAsPackagedCommand(BoxedOrder order)
        {
            this.Order = order;
        }
    }
}