using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities.DTO
{
    //DTO para inserir o cliente
    public class ClientCreateDTO
    {
        public string? Name { get; set; }
        public int Age { get; set; }
        public GenderEnum gender { get; set; }
        public string? Email { get; set; }
    }
}