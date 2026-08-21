using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities.DTO
{
    public class ClientDTO
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public int Age { get; set; }
        public GenderEnum gender { get; set; }
        public string? Email { get; set; }
    }
}