using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities.DTO
{
    public class ScheduleResponseDTO
    {
        public Guid ID { get; set; }
        public Guid ClientID {get; set;}
        public Guid DocID {get; set;}
        public ConsultingRooms consultingRooms { get; set; }
        public DateTime EntranceDate {get; set;}
        public DateTime ScheduleDate {get; set;}
        public ScheduleStatus scheduleStatus {get; set;}
    }
}