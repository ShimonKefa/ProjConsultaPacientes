using System.Security.Cryptography.X509Certificates;
using ProjConsulta.Entities.Enums;
namespace ProjConsulta.Entities
{
    public class Client
    {
        public Guid ID { get; set; } = Guid.NewGuid();
        public string? Name { get; set; }
        public int Age {get; set;}
        public GenderEnum gender{get; set;}
        //Precisa ter o Email para atender a necessidade do comando do bessa de enviar os emails, vou trabalhar nisso depois
        public string? Email{ get; set;}
        public RegStatus regStatus {get; set;} = RegStatus.ATIVO;
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