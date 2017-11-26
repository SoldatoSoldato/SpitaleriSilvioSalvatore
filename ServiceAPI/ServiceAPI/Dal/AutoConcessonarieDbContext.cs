﻿using Microsoft.EntityFrameworkCore;

namespace ServiceAPI.Dal
{
    public class AutoConcessonarieDbContext : DbContext
    {
        public DbSet<Cliente> Clienti { get; set; }

        public DbSet<Vettura> Vetture { get; set; }

        public DbSet<RivenditoreAuto> RivenditoriAuto { get; set; }

        protected override void 
            OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                //.UseMySql(@"Server=localhost;database=corso;uid=corso;pwd=unict;");
                .UseMySql(@"Server=localhost;database=autoconcessonaria;uid=root;");


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // Skip shadow types
                if (entityType.ClrType == null)
                    continue;

                entityType.Relational().TableName = entityType.ClrType.Name;
            }
            base.OnModelCreating(modelBuilder);
        }
    }
}
