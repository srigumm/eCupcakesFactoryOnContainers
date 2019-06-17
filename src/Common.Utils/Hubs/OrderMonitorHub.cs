using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Models;
using Confluent.Kafka;
using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration.EnvironmentVariables;
namespace SignalRDemo.Hubs{
    public class OrderMonitorHub : Hub<IOrderRequest>
    {
        public OrderMonitorHub(IConfiguration config,ConsumerConfig consumerConfiguration)
        {
            _consumerConfig = consumerConfiguration;
            _config = config;
        }
        private ConsumerConfig _consumerConfig;
        private IConfiguration _config;
        public override async Task OnConnectedAsync(){
            //manage and track connections here
            if(!SignalRKafkaProxy.AllConsumers.Keys.Contains(Context.ConnectionId)){
                
                Console.WriteLine("Recieved new connection");
                //
                SignalRClient client = extractInformation(Context);
                SignalRKafkaProxy.AddClient(client);

                //Create a connection object 
                IConsumer<string,string> consumerObj = new ConsumerBuilder<string,string>(client.ConsumerConfig).Build();
                consumerObj.Subscribe(client.Topic);
                Console.WriteLine($"Adding {consumerObj}");
                SignalRKafkaProxy.AddConsumer(client.ConnectionId,consumerObj);
            }

            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine($"Connection Disconnected {Context.ConnectionId}");
            //Remove consumer connection
            if(SignalRKafkaProxy.AllConsumers.Keys.Contains(Context.ConnectionId)){
                SignalRKafkaProxy.AllConsumers.Remove(Context.ConnectionId);
            }
            await base.OnDisconnectedAsync(exception);
        }
        private SignalRClient extractInformation(HubCallerContext context){
            //TODO
            var httpContext = Context.GetHttpContext();
            string consumerGroupName = httpContext.Request.Query["consumergroup"];
            string topicName = this.TopicToMonitor;
            ConsumerConfig config =  _consumerConfig;
            config.GroupId = consumerGroupName;
            config.ClientId = context.ConnectionId;
            return new SignalRClient(){ ConsumerConfig = config,Topic=topicName,ConsumerGroup=consumerGroupName,ConnectionId=context.ConnectionId};
        }

        public Dictionary<string,IConsumer<string,string>> AllActiveConnections{
            get{
                return  SignalRKafkaProxy.AllConsumers;
            }
        }

        private string TopicToMonitor{
            get{return this._config["topic"];}
        }
    }
}