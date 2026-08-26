using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities
{
    public class Schedules
    {
        //estou mexendo aqui ainda, não acabei
        public Guid ID { get; set; } = Guid.NewGuid();
        public Client? client { get; set; }
        public Guid ClientID {get; set;}
        public Doctors? doctor { get; set; }
        public Guid DocID {get; set;}
        public ConsultingRooms consultingRooms { get; set; }
        public DateTime EntranceDate {get; set;} = DateTime.Now;
        public DateTime ScheduleDate {get; set;}
        public ScheduleStatus scheduleStatus {get; set;} = ScheduleStatus.PENDENTE;
        public Schedules() { }
        public Schedules(Guid id, Guid ClientID, Guid DocID, ConsultingRooms consultingRooms, DateTime ScheduleDate)
        {
            ID = id;
            this.ClientID = ClientID;
            this.DocID = DocID;
            this.consultingRooms = consultingRooms;
            this.ScheduleDate = ScheduleDate;
        }

    }
}