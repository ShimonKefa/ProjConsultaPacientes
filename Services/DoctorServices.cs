using ProjConsulta.Data;
using ProjConsulta.Entities;
using ProjConsulta.Entities.DTO;
using ProjConsulta.Entities.Enums;

namespace ProjConsulta.Services
{
    public class DoctorServices
    {
        private readonly DBCOM _context;

        public DoctorServices(DBCOM context)
        {
            _context = context;
        }

        public Doctors InsertDoctor(DoctorCreateDTO doctorCreateDTO)
        {
            Doctors doctors = new Doctors
            {
                Name = doctorCreateDTO.Name,
                Age = doctorCreateDTO.Age,
                gender = doctorCreateDTO.gender,
                Email = doctorCreateDTO.Email,
                docPrf = doctorCreateDTO.docPrf,
            };
            _context.Database.EnsureCreated();
            _context.doctors.Add(doctors);
            _context.SaveChanges();
            return doctors;
        }

        public List<DoctorsResponseDTO> ShowDoctors()
        {
            return _context
                .doctors.Where(d => d.regStatus == RegStatus.ATIVO)
                .Select(d => new DoctorsResponseDTO
                {
                    ID = d.ID,
                    Name = d.Name,
                    Age = d.Age,
                    gender = d.gender,
                    Email = d.Email,
                    docPrf = d.docPrf,
                    regStatus = d.regStatus,
                })
                .ToList();
        }

        public DoctorsResponseDTO? ShowDoctorID(Guid id)
        {
            return _context
                .doctors.Where(d => d.ID == id && d.regStatus == RegStatus.ATIVO)
                .Select(d => new DoctorsResponseDTO
                {
                    ID = d.ID,
                    Name = d.Name,
                    Age = d.Age,
                    gender = d.gender,
                    Email = d.Email,
                    docPrf = d.docPrf,
                    regStatus = d.regStatus,
                })
                .FirstOrDefault();
        }
    }
}
