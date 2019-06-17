namespace Api.KafkaUtil
{
    using Confluent.Kafka;
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Collections.Generic;

    public class ProducerWrapper
    {
        private string _topicName;
        private IProducer<string,string> _producer;
        private ProducerConfig _config;
        private static readonly Random rand = new Random();

        public ProducerWrapper(ProducerConfig config,string topicName)
        {
            this._topicName = topicName;
            this._config = config;
            this._producer = new ProducerBuilder<string,string>(this._config).Build();
            // this._producer.OnError += (_,e)=>{
            //     Console.WriteLine("Exception:"+e);
            // };
        }
        public async Task writeMessage(string message){
            using (var producer = new ProducerBuilder<string, string>(this._config).Build())
            {
                await producer.ProduceAsync(this._topicName, new Message<string, string> { Key = rand.Next(5).ToString(),Value = message })
                    .ContinueWith(task => task.IsFaulted
                        ? $"error producing message: {task.Exception.Message}"
                        : $"produced to: {task.Result.TopicPartitionOffset}");

                // block until all in-flight produce requests have completed (successfully
                // or otherwise) or 10s has elapsed.
                producer.Flush(TimeSpan.FromSeconds(10));
            }
            return;
        }
    }
}