using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities.DTO
{
    public class DoctorCreateDTO
    {
        public string? Name { get; set; }
        public int Age { get; set; }
        public GenderEnum gender { get; set; }
        public string? Email { get; set; }
        public DocProf docPrf { get; set; }
    }
}