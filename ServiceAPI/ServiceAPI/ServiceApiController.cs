using Microsoft.AspNetCore.Mvc;
using ServiceAPI.Dal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace ServiceAPI
{
    [Route("api")]
    public class ServiceApiController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        [HttpGet("setup")]
        public IActionResult SetupDatabase()
        {
            lock (setupLock)
            {
                using (var context = new AutoConcessonarieDbContext())
                {
                    // Create database
                    context.Database.EnsureCreated();
                }
                return Ok("database created");
            }
        }


        [HttpGet("Clienti")]
        public async Task<IActionResult> GetClienti()
        {
            try
            {
                await parallelism.WaitAsync();

                using (var context = new AutoConcessonarieDbContext())
                {
                    return Ok(context.Clienti.ToList());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }
        [HttpGet("Vetture")]
        public async Task<IActionResult> GetVetture()
        {
            try
            {
                await parallelism.WaitAsync();

                using (var context = new AutoConcessonarieDbContext())
                {
                    return Ok(context.Vetture.ToList());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }
        [HttpGet("RivenditoriAuto")]
        public async Task<IActionResult> GetRivenditoriAuto()
        {
            try
            {
                await parallelism.WaitAsync();

                using (var context = new AutoConcessonarieDbContext())
                {
                    return Ok(context.RivenditoriAuto.ToList());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }

        [HttpGet("Cliente")]
        public async Task<IActionResult> GetCliente([FromQuery]int id)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                return Ok(await context.Clienti.FirstOrDefaultAsync(x => x.ID == id));
            }
        }
        [HttpGet("Vettura")]
        public async Task<IActionResult> GetVettura([FromQuery]int id)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                return Ok(await context.Vetture.FirstOrDefaultAsync(x => x.ID == id));
            }
        }
        [HttpGet("RivenditoreAuto")]
        public async Task<IActionResult> GetRivenditoreAuto([FromQuery]int id)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                return Ok(await context.RivenditoriAuto.FirstOrDefaultAsync(x => x.ID == id));
            }
        }

        [HttpPut("Clienti")]
        public async Task<IActionResult> CreateCliente([FromBody]Cliente cliente)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                context.Clienti.Add(cliente);

                await context.SaveChangesAsync();

                return Ok();
            }
        }
        [HttpPut("Vetture")]
        public async Task<IActionResult> CreateVettura([FromBody]Vettura vettura)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                context.Vetture.Add(vettura);

                await context.SaveChangesAsync();

                return Ok();
            }
        }
        [HttpPut("RivenditoriAuto")]
        public async Task<IActionResult> CreateRivenditoreAuto([FromBody]RivenditoreAuto rivenditoreAuto)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                context.RivenditoriAuto.Add(rivenditoreAuto);

                await context.SaveChangesAsync();

                return Ok();
            }
        }
        [HttpPost("Clienti")]
        public async Task<IActionResult> UpdateCliente([FromBody]Cliente cliente)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                context.Clienti.Update(cliente);
                await context.SaveChangesAsync();
                return Ok();
            }
        }
        [HttpPost("Vetture")]
        public async Task<IActionResult> UpdateVettura([FromBody]Vettura vettura)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                context.Vetture.Update(vettura);
                await context.SaveChangesAsync();
                return Ok();
            }
        }
        [HttpPost("RivenditoriAuto")]
        public async Task<IActionResult> UpdateRivenditoreAuto([FromBody]RivenditoreAuto rivenditoreAuto)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                context.RivenditoriAuto.Update(rivenditoreAuto);
                await context.SaveChangesAsync();
                return Ok();
            }
        }
        [HttpDelete("Clienti")]
        public async Task<IActionResult> DeleteCliente([FromQuery]int id)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                var cliente = await context.Clienti.FirstOrDefaultAsync(x => x.ID == id);
                if (cliente != null)
                {
                    context.Clienti.Remove(cliente);
                    await context.SaveChangesAsync();
                }
                return Ok();


            }
        }
        [HttpDelete("Vetture")]
        public async Task<IActionResult> DeleteVettura([FromQuery]int id)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                var vettura = await context.Vetture.FirstOrDefaultAsync(x => x.ID == id);
                if (vettura != null)
                {
                    context.Vetture.Remove(vettura);
                    await context.SaveChangesAsync();
                }
                return Ok();


            }
        }
        [HttpDelete("RivenditoriAuto")]
        public async Task<IActionResult> DeleteRivenditoreAuto([FromQuery]int id)
        {
            using (var context = new AutoConcessonarieDbContext())
            {
                var rivenditoreAuto = await context.RivenditoriAuto.FirstOrDefaultAsync(x => x.ID == id);
                if (rivenditoreAuto != null)
                {
                    context.RivenditoriAuto.Remove(rivenditoreAuto);
                    await context.SaveChangesAsync();
                }
                return Ok();


            }
        }
    }
}
