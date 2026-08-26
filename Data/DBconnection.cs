using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using ProjConsulta.Entities;
using ProjConsulta.Env;

namespace ProjConsulta.Data
{
    public class DBCOM : DbContext
    {
        //String do contexto do banco, Contexto nesse caso é o caminho até o banco
        public string Context { get; set; } = null!;

        public DBCOM()
        {
            //você já entendeu, aqui ele pega o endereço do banco e armazena no contexto
            EnvironmentService enviroment = new EnvironmentService();
            enviroment.EnsureCreated();
            Context = $"Data Source={enviroment.DBFilePath}";
        }

        //criação das tabelas no arquivo do SQL
        public DbSet<Client> clients { get; set; }
        public DbSet<Doctors> doctors { get; set; }
        public DbSet<Schedules> schedules { get; set; }
        public DbSet<AppUser> users { get; set; }

        //definição do SGBD no caso o Sqlite
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(Context);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppUser>().ToTable("users");

            modelBuilder.Entity<AppUser>().HasIndex(u => u.Email).IsUnique();
        }
    }
}
