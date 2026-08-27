using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjConsulta.Entities;
using ProjConsulta.Entities.Enums;
using ProjConsulta.Env;

namespace ProjConsulta.Data;

public static class DatabaseInitializer
{
    public const string InitialAdminEmail = "admin@clinicavitta.com";
    public const string InitialAdminPassword = "Vitta@2026!";

    public static void EnsureAdminCreation(DBCOM context, IPasswordHasher<AppUser> passwordHasher)
    {
        context.Database.EnsureCreated();

        // 1. Admin User
        var initialAdmin = context.users.SingleOrDefault(user => user.Email == InitialAdminEmail);
        if (initialAdmin is null)
        {
            initialAdmin = new AppUser
            {
                Name = "Administrador",
                Email = InitialAdminEmail,
                Role = "Admin",
                IsActive = true
            };
            initialAdmin.PasswordHash = passwordHasher.HashPassword(initialAdmin, InitialAdminPassword);
            context.users.Add(initialAdmin);
            context.SaveChanges();
        }

        // 2. Sample Clients (Pacientes)
        if (!context.clients.Any())
        {
            var sampleClients = new List<Client>
            {
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111101"), Name = "João Silva", Age = 34, gender = GenderEnum.MALE, Email = "joao.silva@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111102"), Name = "Ana Costa", Age = 29, gender = GenderEnum.FEMALE, Email = "ana.costa@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111103"), Name = "Patrícia Branco", Age = 42, gender = GenderEnum.FEMALE, Email = "patricia.branco@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111104"), Name = "André Martins", Age = 51, gender = GenderEnum.MALE, Email = "andre.martins@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111105"), Name = "Fernanda Lima", Age = 26, gender = GenderEnum.FEMALE, Email = "fernanda.lima@clinicavitta.com", regStatus = RegStatus.INATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111106"), Name = "Lucas Ribeiro", Age = 38, gender = GenderEnum.MALE, Email = "lucas.ribeiro@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111107"), Name = "Mariana Alvares", Age = 31, gender = GenderEnum.FEMALE, Email = "mariana.alvares@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111108"), Name = "Roberto Rocha", Age = 62, gender = GenderEnum.MALE, Email = "roberto.rocha@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111109"), Name = "Camila Nogueira", Age = 45, gender = GenderEnum.FEMALE, Email = "camila.nogueira@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111110"), Name = "Thiago Mendes", Age = 28, gender = GenderEnum.MALE, Email = "thiago.mendes@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111111"), Name = "Beatriz Vasconcelos", Age = 33, gender = GenderEnum.FEMALE, Email = "beatriz.vasconcelos@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111112"), Name = "Eduardo Guimarães", Age = 59, gender = GenderEnum.MALE, Email = "eduardo.guimaraes@clinicavitta.com", regStatus = RegStatus.INATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111113"), Name = "Helena Carvalho", Age = 7, gender = GenderEnum.FEMALE, Email = "helena.carvalho@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111114"), Name = "Gabriel Fontes", Age = 40, gender = GenderEnum.MALE, Email = "gabriel.fontes@clinicavitta.com", regStatus = RegStatus.ATIVO },
                new Client { ID = Guid.Parse("11111111-1111-1111-1111-111111111115"), Name = "Larissa Peixoto", Age = 22, gender = GenderEnum.FEMALE, Email = "larissa.peixoto@clinicavitta.com", regStatus = RegStatus.INATIVO }
            };

            context.clients.AddRange(sampleClients);
            context.SaveChanges();
        }

        // 3. Sample Doctors (Corpo Clínico)
        if (!context.doctors.Any())
        {
            var sampleDoctors = new List<Doctors>
            {
                new Doctors { ID = Guid.Parse("22222222-2222-2222-2222-222222222201"), Name = "Dra. Marina Souza", Age = 36, gender = GenderEnum.FEMALE, Email = "marina.souza@clinicavitta.com", docPrf = DocProf.FISIOTERAPIA, regStatus = RegStatus.ATIVO },
                new Doctors { ID = Guid.Parse("22222222-2222-2222-2222-222222222202"), Name = "Dr. Felipe Santos", Age = 41, gender = GenderEnum.MALE, Email = "felipe.santos@clinicavitta.com", docPrf = DocProf.ODONTOLOGIA, regStatus = RegStatus.ATIVO },
                new Doctors { ID = Guid.Parse("22222222-2222-2222-2222-222222222203"), Name = "Dra. Beatriz Lima", Age = 39, gender = GenderEnum.FEMALE, Email = "beatriz.lima@clinicavitta.com", docPrf = DocProf.PSICOLOGIA, regStatus = RegStatus.ATIVO },
                new Doctors { ID = Guid.Parse("22222222-2222-2222-2222-222222222204"), Name = "Dr. Carlos Eduardo", Age = 48, gender = GenderEnum.MALE, Email = "carlos.eduardo@clinicavitta.com", docPrf = DocProf.CARDIOLOGIA, regStatus = RegStatus.ATIVO },
                new Doctors { ID = Guid.Parse("22222222-2222-2222-2222-222222222205"), Name = "Dr. Lucas Silveira", Age = 35, gender = GenderEnum.MALE, Email = "lucas.silveira@clinicavitta.com", docPrf = DocProf.PEDIATRIA, regStatus = RegStatus.ATIVO },
                new Doctors { ID = Guid.Parse("22222222-2222-2222-2222-222222222206"), Name = "Dra. Renata Martins", Age = 43, gender = GenderEnum.FEMALE, Email = "renata.martins@clinicavitta.com", docPrf = DocProf.ORTOPEDIA, regStatus = RegStatus.INATIVO }
            };

            context.doctors.AddRange(sampleDoctors);
            context.SaveChanges();
        }

        // 4. Sample Schedules (Agendamentos e Histórico)
        if (!context.schedules.Any())
        {
            var p1 = Guid.Parse("11111111-1111-1111-1111-111111111101"); // João Silva
            var p2 = Guid.Parse("11111111-1111-1111-1111-111111111102"); // Ana Costa
            var p3 = Guid.Parse("11111111-1111-1111-1111-111111111103"); // Patrícia Branco
            var p4 = Guid.Parse("11111111-1111-1111-1111-111111111104"); // André Martins
            var p5 = Guid.Parse("11111111-1111-1111-1111-111111111105"); // Fernanda Lima
            var p6 = Guid.Parse("11111111-1111-1111-1111-111111111106"); // Lucas Ribeiro
            var p7 = Guid.Parse("11111111-1111-1111-1111-111111111107"); // Mariana Alvares
            var p8 = Guid.Parse("11111111-1111-1111-1111-111111111108"); // Roberto Rocha
            var p9 = Guid.Parse("11111111-1111-1111-1111-111111111109"); // Camila Nogueira
            var p10 = Guid.Parse("11111111-1111-1111-1111-111111111110"); // Thiago Mendes
            var p11 = Guid.Parse("11111111-1111-1111-1111-111111111111"); // Beatriz Vasconcelos
            var p12 = Guid.Parse("11111111-1111-1111-1111-111111111112"); // Eduardo Guimarães
            var p13 = Guid.Parse("11111111-1111-1111-1111-111111111113"); // Helena Carvalho
            var p14 = Guid.Parse("11111111-1111-1111-1111-111111111114"); // Gabriel Fontes

            var d1 = Guid.Parse("22222222-2222-2222-2222-222222222201"); // Dra. Marina Souza (Fisio)
            var d2 = Guid.Parse("22222222-2222-2222-2222-222222222202"); // Dr. Felipe Santos (Odonto)
            var d3 = Guid.Parse("22222222-2222-2222-2222-222222222203"); // Dra. Beatriz Lima (Psico)
            var d4 = Guid.Parse("22222222-2222-2222-2222-222222222204"); // Dr. Carlos Eduardo (Cardio)
            var d5 = Guid.Parse("22222222-2222-2222-2222-222222222205"); // Dr. Lucas Silveira (Pediatria)

            var sampleSchedules = new List<Schedules>
            {
                // Agenda 2026-08-26 (Hoje)
                new Schedules { ID = Guid.NewGuid(), ClientID = p1, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 26, 8, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p2, DocID = d2, consultingRooms = ConsultingRooms.CS02, ScheduleDate = new DateTime(2026, 8, 26, 9, 30, 0), scheduleStatus = ScheduleStatus.ATENDENDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p3, DocID = d3, consultingRooms = ConsultingRooms.CS03, ScheduleDate = new DateTime(2026, 8, 26, 10, 0, 0), scheduleStatus = ScheduleStatus.ATENDENDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p4, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 26, 11, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p6, DocID = d2, consultingRooms = ConsultingRooms.CS02, ScheduleDate = new DateTime(2026, 8, 26, 14, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p9, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 26, 15, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p7, DocID = d3, consultingRooms = ConsultingRooms.CS03, ScheduleDate = new DateTime(2026, 8, 26, 16, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p5, DocID = d4, consultingRooms = ConsultingRooms.CS04, ScheduleDate = new DateTime(2026, 8, 26, 17, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },

                // Agenda 2026-08-25
                new Schedules { ID = Guid.NewGuid(), ClientID = p11, DocID = d4, consultingRooms = ConsultingRooms.CS04, ScheduleDate = new DateTime(2026, 8, 25, 8, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p13, DocID = d5, consultingRooms = ConsultingRooms.CS05, ScheduleDate = new DateTime(2026, 8, 25, 10, 0, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p10, DocID = d2, consultingRooms = ConsultingRooms.CS02, ScheduleDate = new DateTime(2026, 8, 25, 11, 0, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p1, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 25, 14, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },

                // Agenda 2026-08-24
                new Schedules { ID = Guid.NewGuid(), ClientID = p1, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 24, 8, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p2, DocID = d2, consultingRooms = ConsultingRooms.CS02, ScheduleDate = new DateTime(2026, 8, 24, 9, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p3, DocID = d3, consultingRooms = ConsultingRooms.CS03, ScheduleDate = new DateTime(2026, 8, 24, 10, 0, 0), scheduleStatus = ScheduleStatus.ATENDENDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p4, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 24, 11, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p6, DocID = d2, consultingRooms = ConsultingRooms.CS02, ScheduleDate = new DateTime(2026, 8, 24, 14, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p9, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 24, 15, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p7, DocID = d3, consultingRooms = ConsultingRooms.CS03, ScheduleDate = new DateTime(2026, 8, 24, 16, 30, 0), scheduleStatus = ScheduleStatus.PENDENTE },
                new Schedules { ID = Guid.NewGuid(), ClientID = p5, DocID = d4, consultingRooms = ConsultingRooms.CS04, ScheduleDate = new DateTime(2026, 8, 24, 17, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },

                // Histórico anterior
                new Schedules { ID = Guid.NewGuid(), ClientID = p6, DocID = d2, consultingRooms = ConsultingRooms.CS02, ScheduleDate = new DateTime(2026, 8, 23, 8, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p7, DocID = d3, consultingRooms = ConsultingRooms.CS03, ScheduleDate = new DateTime(2026, 8, 23, 11, 0, 0), scheduleStatus = ScheduleStatus.CANCELADO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p4, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 23, 14, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p9, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 22, 9, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p8, DocID = d4, consultingRooms = ConsultingRooms.CS04, ScheduleDate = new DateTime(2026, 8, 22, 15, 0, 0), scheduleStatus = ScheduleStatus.CANCELADO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p10, DocID = d2, consultingRooms = ConsultingRooms.CS02, ScheduleDate = new DateTime(2026, 8, 21, 14, 30, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p11, DocID = d4, consultingRooms = ConsultingRooms.CS04, ScheduleDate = new DateTime(2026, 8, 20, 10, 30, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p13, DocID = d5, consultingRooms = ConsultingRooms.CS05, ScheduleDate = new DateTime(2026, 8, 19, 16, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p14, DocID = d3, consultingRooms = ConsultingRooms.CS03, ScheduleDate = new DateTime(2026, 8, 18, 11, 30, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p4, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 17, 8, 30, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p3, DocID = d3, consultingRooms = ConsultingRooms.CS03, ScheduleDate = new DateTime(2026, 8, 16, 15, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p2, DocID = d2, consultingRooms = ConsultingRooms.CS02, ScheduleDate = new DateTime(2026, 8, 15, 10, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO },
                new Schedules { ID = Guid.NewGuid(), ClientID = p12, DocID = d1, consultingRooms = ConsultingRooms.CS01, ScheduleDate = new DateTime(2026, 8, 14, 14, 0, 0), scheduleStatus = ScheduleStatus.ATENDIDO }
            };

            context.schedules.AddRange(sampleSchedules);
            context.SaveChanges();
        }
    }
}
