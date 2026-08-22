using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProjConsulta.Data;
using ProjConsulta.Entities;
using ProjConsulta.Entities.DTO;
using ProjConsulta.Services;

namespace ProjConsulta.Controllers
{
    [Route("API/[Controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _client;

        public ClientController(ClientService client)
        {
            _client = client;
        }

        //lista todos os clientes
        [HttpGet]
        public IActionResult GetClient()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var client = _client.ShowClients();
            return Ok(client);
        }

        [HttpGet("{ID}/GetClientByID")]
        public IActionResult GetClientByID(Guid ID)
        {
            var client = _client.ShowClientbyID(ID);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        [HttpPost]
        public IActionResult InsertClient([FromBody] ClientCreateDTO clientcreateDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var insert = _client.InsertClient(clientcreateDTO);
            return Ok(insert);
        }
    }
}
