using System.Threading.Tasks;

namespace Api.Models{
    public interface IOrder
    {
        Task InformNewOrderToMix(OrderRequest o);
        Task InformNewOrderToBake(MixedOrder o);
        Task InformNewOrderToDecorate(BakedOrder o);
        Task InformNewOrderToPackage(DecoratedOrder o);
    }
}