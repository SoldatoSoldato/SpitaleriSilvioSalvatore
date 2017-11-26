using Microsoft.AspNetCore.Hosting;
using ServiceAPI.Dal;
using System;
using System.Threading.Tasks;

namespace ServiceAPI
{
    class Program
    {
        static void Main(string[] args)
        {

            var host = new WebHostBuilder()
               .UseKestrel()
               .UseStartup<Startup>()
               .Build();

            Task restService = host.RunAsync();


            using (var context = new AutoConcessonarieDbContext())
            {
                // Create database
                context.Database.EnsureCreated();
                //Fatto per la prima volta
                /*Cliente c = new Cliente()
                {
                    Nome = "Nome",
                    DataNascita = new DateTime(2012, 1, 1),
                    CF="SVV677",
                    Cognome="Cognome",
                    Email="esempio@gmail.com",
                    Indirizzo="indirizzo",
                    Sesso="x",
                    Telefono=100000
                };

                context.Clienti.Add(c);

               context.SaveChanges();*/
            }


            //System.Diagnostics.Process.Start("chrome.exe", "http://localhost/netcoreapp2.0/corsoing/");
            //System.Diagnostics.Process.Start("cmd", "/C start http://localhost/netcoreapp2.0/corsoing/");
            restService.Wait();
        }
    }
}
