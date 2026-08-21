using System.Data.Common;
using ProjConsulta.Entities;
using ProjConsulta.Data;
namespace ProjConsulta.Services
{
    public class ClientService
    {
        private readonly DBCOM _context;

        public ClientService(DBCOM context)
        {
            _context = context;
        }
        public Client InsertClient(Client client)
        {
            using var context = new DBCOM();
            context.Database.EnsureCreated();
            context.clients.Add(client);
            context.SaveChanges();
            return client;   
        }
        
    }
}