using Microsoft.AspNetCore.Mvc;
using ProjConsulta.Entities.DTO;
using ProjConsulta.Entities.Exceptions;
using ProjConsulta.Services;

namespace ProjConsulta.Controllers
{
    [Route("API/[Controller]")]
    [ApiController]
    public class SchedulesController : ControllerBase
    {
        private readonly ScheduleService _schedule;

        public SchedulesController(ScheduleService schedule, EmailSendService sendEmail)
        {
            _schedule = schedule;
        }

        [HttpGet("Pendentes")]
        public IActionResult GetPendentes()
        {
            var schedules = _schedule.GetSchedules_Pendente();
            return Ok(schedules);
        }

        [HttpGet("Atendidos")]
        public IActionResult GetAtendidos()
        {
            var schedules = _schedule.GetSchedules_Atendidos();
            return Ok(schedules);
        }

        [HttpGet("Cancelados")]
        public IActionResult GetCancelados()
        {
            var schedules = _schedule.GetSchedules_Cancelados();
            return Ok(schedules);
        }

        [HttpGet("EmAtendimento")]
        public IActionResult GetEmAtendimento()
        {
            var schedules = _schedule.GetSchedules_Em_Atendimento();
            return Ok(schedules);
        }

        [HttpGet("{ID}/GetScheduleByID")]
        public IActionResult GetScheduleByID(Guid ID)
        {
            var schedule = _schedule.GetSchedulesByID(ID);
            if (schedule == null)
            {
                return NotFound();
            }
            return Ok(schedule);
        }

        [HttpPost]
        public IActionResult StartSchedule([FromBody] ScheduleCreateDTO scheduleCreateDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var schedule = _schedule.StartSchedule(scheduleCreateDTO);
                return Ok(schedule);
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{ID}/Finish")]
        public IActionResult FinishSchedule(Guid ID)
        {
            try
            {
                var schedule = _schedule.FinishSchedules(ID);
                return Ok(schedule);
            }
            catch (DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}