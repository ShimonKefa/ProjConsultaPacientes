using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities.DTO
{
    public class ScheduleCreateDTO
    {
        public Client? client { get; set; }
        public Guid ClientID {get; set;}
        public Doctors? doctor { get; set; }
        public Guid DocID {get; set;}
        public ConsultingRooms consultingRooms { get; set; }
        public DateTime ScheduleDate {get; set;}

    }
}