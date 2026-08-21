using ProjConsulta.Enums;
namespace ProjConsulta.Entities
{
    public class Client
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public int Age {get; set;}
        public GenderEnum gender{get; set;}
        public string? Email{ get; set;}
        public Client(){ }
        public Client(Guid id, string? name, int age, GenderEnum gender, string? email)
        {
            ID = id;
            Name = name;
            Age = age;
            this.gender = gender;
            Email = email;
        }
    }
}