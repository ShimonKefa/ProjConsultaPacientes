using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities.DTO
{
    //DTO para consulta do cliente
    public class ClientResponseDTO
    {
        public Guid ID { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public GenderEnum gender { get; set; }
        public string? Email { get; set; }
    }
}