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
            _context.Database.EnsureCreated();
            _context.clients.Add(client);
            _context.SaveChanges();
            return client;   
        }
        
        public List<Client> ShowClients(Client client)
        {
            return _context.clients.ToList();
        }

        public Client ShowClientbyID(Guid id)
        {
            return _context.clients.FirstOrDefault(c => c.ID == id);
        }

        
    }
}