using ProjConsulta.Entities;
using ProjConsulta.Data;
namespace ProjConsulta.Services
{
    public class DoctorServices
    {
        private readonly DBCOM _context;

        public DoctorServices(DBCOM context)
        {
            _context = context;
        }   
        public Doctors InsertDoctor(Doctors doctors)
        {
            _context.Database.EnsureCreated();
            _context.doctors.Add(doctors);
            _context.SaveChanges();
            return doctors;   
        }
        
        public List<Doctors> ShowDoctors()
        {
            return _context.doctors.ToList();
        }

        public Doctors ShowDoctorID(Guid id)
        {
            return _context.doctors.FirstOrDefault(c => c.ID == id);
        }
    }
}