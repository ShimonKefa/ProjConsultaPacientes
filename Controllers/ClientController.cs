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
    //Rota que a api vai consumir : Localhost xxxx/API/"Endpoint que eu preciso"
    [Route("API/[Controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        //Objeto que acessa os serviços direcionados aos clientes
        private readonly ClientService _client;

        public ClientController(ClientService client)
        {
            //recebe o Objeto da classe serviço e armazena na classe privada vista
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

        //lista o cliente pelo ID, na hora de consultar um ID único o sistema deve procurar pelo ID.
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
        //Insere o cliente no banco, insert Simples
        public IActionResult InsertClient([FromBody] ClientCreateDTO clientcreateDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var insert = _client.InsertClient(clientcreateDTO);
            return Ok(insert);
        }

        [HttpPost("{ID}/DeleteClient")]
        //update do registro pra delete
        public IActionResult DeleteClient([FromBody] ClientResponseDTO clientResponseDTO, Guid ID)
        {
            var delete = _client.DeleteClient(clientResponseDTO, ID);
            return Ok(delete);

        }
    }
}
