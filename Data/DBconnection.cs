using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using ProjConsulta.Env;
using ProjConsulta.Entities;
namespace ProjConsulta.Data
{
    public class DBCOM : DbContext
    {
        public string Context { get; set; } = null!;
        public DBCOM()
        {
            EnvironmentService enviroment = new EnvironmentService();
            enviroment.EnsureCreated();
            Context = $"Data Source={enviroment.DBFilePath}";
        }
        public DbSet<Client> clients { get; set; }
        public DbSet<Doctors> doctors { get; set; }
        public DbSet<Scheduling> schedulings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(Context);
        }
    }
}