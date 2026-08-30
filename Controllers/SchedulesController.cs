using Microsoft.AspNetCore.Mvc;
using ProjConsulta.Entities.DTO;
using ProjConsulta.Entities.Enums;
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

        [HttpGet]
        public IActionResult GetAllSchedules()
        {
            var schedules = _schedule.GetAllSchedules();
            return Ok(schedules);
        }

        [HttpGet("Range")]
        public IActionResult GetSchedulesByRange([FromQuery] DateTime start, [FromQuery] DateTime end)
        {
            var schedules = _schedule.GetSchedulesByRange(start, end);
            return Ok(schedules);
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
        public async Task<IActionResult> StartSchedule([FromBody] ScheduleCreateDTO scheduleCreateDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var schedule =  await _schedule.StartSchedule(scheduleCreateDTO);
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

        [HttpPut("{ID}/Revert")]
        public IActionResult RevertSchedule(Guid ID, [FromQuery] ScheduleStatus status = ScheduleStatus.ATENDENDO)
        {
            try
            {
                var schedule = _schedule.RevertSchedule(ID, status);
                return Ok(schedule);
            }
            catch (DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}