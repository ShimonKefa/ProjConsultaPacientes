using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities
{
    public class Doctors
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public int Age { get; set; }
        public GenderEnum gender { get; set; }
        public string? Email { get; set; }
        public DocProf docPrf { get; set; }
        public RegStatus regStatus {get; set;} = RegStatus.ATIVO;
        public Doctors(){ }        
        public Doctors(Guid id, string? name, int age, GenderEnum gender, string email, DocProf docPrf, RegStatus regStatus){
            ID = id;
            Name = name;
            Age = age;
            this.gender = gender;
            Email = email;
            this.docPrf = docPrf;
            this.regStatus = regStatus;
        }
    }
}