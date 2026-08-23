using System.Data.Common;
using ProjConsulta.Data;
using ProjConsulta.Entities;
using ProjConsulta.Entities.DTO;
using ProjConsulta.Entities.Enums;

namespace ProjConsulta.Services
{
    public class ClientService
    {
        private readonly DBCOM _context;

        public ClientService(DBCOM context)
        {
            _context = context;
        }

        public Client InsertClient(ClientCreateDTO clientcreateDTO)
        {
            Client client = new Client
            {
                Name = clientcreateDTO.Name,
                Age = clientcreateDTO.Age,
                gender = clientcreateDTO.gender,
                Email = clientcreateDTO.Email
            };
            _context.clients.Add(client);
            _context.SaveChanges();

            return client;
        }

        public List<ClientResponseDTO> ShowClients()
        {
            return _context.clients
                .Where(c => c.regStatus == RegStatus.ATIVO)
                .Select(c => new ClientResponseDTO
                {
                    ID = c.ID,
                    Name = c.Name,
                    Age = c.Age,
                    gender = c.gender,
                    Email = c.Email,
                    regStatus = c.regStatus
                })
                .ToList();
        }

        public ClientResponseDTO? ShowClientbyID(Guid id)
        {
            return _context
                .clients.Where(c => c.ID == id && c.regStatus == RegStatus.ATIVO)
                .Select(c => new ClientResponseDTO
                {
                    ID = c.ID,
                    Name = c.Name,
                    Age = c.Age,
                    gender = c.gender,
                    Email = c.Email,
                    regStatus = c.regStatus
                })
                .FirstOrDefault();
        }
    }
}
