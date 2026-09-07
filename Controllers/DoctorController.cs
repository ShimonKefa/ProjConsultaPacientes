using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProjConsulta.Data;
using ProjConsulta.Entities;
using ProjConsulta.Entities.DTO;
using ProjConsulta.Services;
using Microsoft.AspNetCore.Authorization;

namespace ProjConsulta.Controllers
{
    [Route("API/[Controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly DoctorServices _doc;

        public DoctorController(DoctorServices doc)
        {
            _doc = doc;
        }

        //lista todos os clientes
        [HttpGet]
        [Authorize]
        public IActionResult GetDocs()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var doc = _doc.ShowDoctors();
            return Ok(doc);
        }

        [HttpGet("{ID}/GetDocsByID")]
        [Authorize]
        public IActionResult GetDocsByID(Guid ID)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var doc = _doc.ShowDoctorID(ID);
            return Ok(doc);
        }

        [HttpPost]
        [Authorize]
        public IActionResult InsertDoc([FromBody] DoctorCreateDTO doctorCreateDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var insert = _doc.InsertDoctor(doctorCreateDTO);
            return Ok(insert);
        }

        [HttpPost("{ID}/DeleteDoctor")]
        [Authorize]
        //update do registro pra delete
        public IActionResult DeleteClient([FromBody] DoctorsResponseDTO doctorsResponse, Guid ID)
        {
            var delete = _doc.DeleteDoctor(doctorsResponse, ID);
            return Ok(delete);

        }
    }
}
