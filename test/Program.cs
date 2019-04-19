using System;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using CupcakeFactory.Clients;

namespace test
{
    class Program
    {
        static void Main(string[] args)
        {
            new HostBuilder()
                        .ConfigureServices((hostContext, services) =>
                        {
                            if (hostContext.HostingEnvironment.IsDevelopment())
                            {
                                // Development service configuration
                            }
                            else
                            {
                                // Non-development service configuration
                            }

                            services.AddHostedService<CupcakeFactoryClient>();

                        }).Build().RunAsync().GetAwaiter().GetResult();
        }
    }
}
