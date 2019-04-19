using System.Collections.Generic;
using Confluent.Kafka;

namespace SignalRDemo.Hubs
{
    public class SignalRKafkaProxy{

        private static List<SignalRClient> _clients;
        private static Dictionary<string,Consumer<string,string>> _consumers;

        static SignalRKafkaProxy(){
            _clients = new List<SignalRClient>();
            _consumers = new Dictionary<string, Consumer<string, string>>();
        }
        public static void AddClient(SignalRClient client){
            _clients.Add(client);
        }

        public static void AddConsumer(string connectionId,Consumer<string,string> consumerConnection){
            _consumers.Add(connectionId,consumerConnection);
        }

        public static Dictionary<string,Consumer<string,string>> AllConsumers{
            get{
                return _consumers;
            }
        }

    }

    public class SignalRClient{
        public string ConnectionId { get; set; }
        public string Url { get; set; }
        public string Topic { get; set; }
        public string ConsumerGroup {get;set;}

        public ConsumerConfig ConsumerConfig{get;set;}
    }
}