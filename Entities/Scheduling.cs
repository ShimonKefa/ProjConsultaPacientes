using ProjConsulta.Enums;
namespace ProjConsulta.Entities
{
    public class Scheduling
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public Client? client { get; set; }
        public Doctors? doctor { get; set; }
        public ConsultingRooms consultingRooms { get; set; }

        public Scheduling() { }
        public Scheduling(Guid id, Client? client, Doctors doctor, ConsultingRooms consultingRooms)
        {
            ID = id;
            this.client = client;
            this.doctor = doctor;
            this.consultingRooms = consultingRooms;
        }

    }
}