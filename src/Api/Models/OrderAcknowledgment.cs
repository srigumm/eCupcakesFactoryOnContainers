using System;
namespace Api.Models
{
    public class OrderAcknowledgment{
        public Guid CorrelationId { get; set; }
        public string Acknowledgment { get; set; }
        public string CreatedOn { get; set; }
        public OrderRequest Order{get;set;}

    }
    
}