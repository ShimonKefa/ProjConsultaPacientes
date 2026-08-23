using ProjConsulta.Data;
using ProjConsulta.Entities;
using ProjConsulta.Entities.DTO;
using ProjConsulta.Entities.Enums;
using ProjConsulta.Entities.Exceptions;

namespace ProjConsulta.Services
{
    public class ScheduleService
    {
        private readonly DBCOM _context;
        public ScheduleService(DBCOM context)
        {
            _context = context;
        }
        public Schedules StartSchedule(ScheduleCreateDTO _schedules)
        {
            Schedules schedules = new Schedules
            {
                ClientID = _schedules.ClientID,
                DocID = _schedules.DocID,
                consultingRooms = _schedules.consultingRooms,
                ScheduleDate = _schedules.ScheduleDate,
            };
            bool ConflitoHorario = _context.schedules.Any(s =>
                s.DocID == schedules.DocID
                && s.ScheduleDate == schedules.ScheduleDate
                && s.scheduleStatus == ScheduleStatus.PENDENTE
            );
            if (ConflitoHorario == true)
            {
                throw new DomainException(
                    "Conflito de horário, possui algum atendimento agendado nesse horário"
                );
            }
            _context.schedules.Add(schedules);
            _context.SaveChanges();
            return schedules;
        }
        public Schedules FinishSchedules(Guid id)
        {
            var schedule = _context.schedules.FirstOrDefault(s => s.ID == id);
            if (schedule == null)
            {
                throw new DomainException("Atendimento não encontrado");
            }
            schedule.scheduleStatus = ScheduleStatus.ATENDIDO;
            _context.SaveChanges();
            return schedule;
        }
        public List<ScheduleResponseDTO> GetSchedules_Pendente()
        {
            return _context
                .schedules.Where(s => s.scheduleStatus == ScheduleStatus.PENDENTE)
                .Select(s => new ScheduleResponseDTO
                {
                    ID = s.ID,
                    ClientID = s.ClientID,
                    DocID = s.DocID,
                    consultingRooms = s.consultingRooms,
                    EntranceDate = s.EntranceDate,
                    ScheduleDate = s.ScheduleDate,
                    scheduleStatus = s.scheduleStatus,
                })
                .ToList();
        }
        public List<ScheduleResponseDTO> GetSchedules_Atendidos()
        {
            return _context
                .schedules.Where(s => s.scheduleStatus == ScheduleStatus.ATENDIDO)
                .Select(s => new ScheduleResponseDTO
                {
                    ID = s.ID,
                    ClientID = s.ClientID,
                    DocID = s.DocID,
                    consultingRooms = s.consultingRooms,
                    EntranceDate = s.EntranceDate,
                    ScheduleDate = s.ScheduleDate,
                    scheduleStatus = s.scheduleStatus,
                })
                .ToList();
        }
        public List<ScheduleResponseDTO> GetSchedules_Cancelados()
        {
            return _context
                .schedules.Where(s => s.scheduleStatus == ScheduleStatus.CANCELADO)
                .Select(s => new ScheduleResponseDTO
                {
                    ID = s.ID,
                    ClientID = s.ClientID,
                    DocID = s.DocID,
                    consultingRooms = s.consultingRooms,
                    EntranceDate = s.EntranceDate,
                    ScheduleDate = s.ScheduleDate,
                    scheduleStatus = s.scheduleStatus,
                })
                .ToList();
        }
        public List<ScheduleResponseDTO> GetSchedules_Em_Atendimento()
        {
            return _context
                .schedules.Where(s => s.scheduleStatus == ScheduleStatus.ATENDENDO)
                .Select(s => new ScheduleResponseDTO
                {
                    ID = s.ID,
                    ClientID = s.ClientID,
                    DocID = s.DocID,
                    consultingRooms = s.consultingRooms,
                    EntranceDate = s.EntranceDate,
                    ScheduleDate = s.ScheduleDate,
                    scheduleStatus = s.scheduleStatus,
                })
                .ToList();
        }
        public ScheduleResponseDTO? GetSchedulesByID(Guid id)
        {
            return _context.schedules
            .Where(s => s.ID == id)
            .Select(s => new ScheduleResponseDTO
            {
                    ID = s.ID,
                    ClientID = s.ClientID,
                    DocID = s.DocID,
                    consultingRooms = s.consultingRooms,
                    EntranceDate = s.EntranceDate,
                    ScheduleDate = s.ScheduleDate,
                    scheduleStatus = s.scheduleStatus,
            })
            .FirstOrDefault();
        }


    }
}
