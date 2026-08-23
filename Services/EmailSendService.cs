using MailKit;
using MailKit.Net.Smtp;
using MimeKit;
using ProjConsulta.Env;
using ProjConsulta.Entities;
using ProjConsulta.Entities.Exceptions;

namespace ProjConsulta.Services
{
    public class EmailSendService
    {
        private readonly string _SMTP_SENHA;
        private readonly string _SMTP_EMAIL;
        

        public EmailSendService(EnvironmentService env)
        {
            _SMTP_SENHA = env.SenhaSMTP;
            _SMTP_EMAIL = env.EmailSender;
        }
        public void ScheduleSendEmail(Schedules schedules)
        {
            var client = schedules.client;
            var doctor = schedules.doctor;
            if(client == null || string.IsNullOrEmpty(client.Email))
            {
                throw new DomainException("usuário ou email não encontrado");
            }
            string MensagemCliente = @$"
            Olá {client.Name},
            Sua Consulta foi agendada para o dia: {schedules.ScheduleDate}, para o(a) doutor(a) {doctor.Name}
            no Consultório: {schedules.consultingRooms}";
            
            MimeMessage message = new MimeMessage();
            message.From.Add(new MailboxAddress("ProjConsultas", _SMTP_EMAIL));
            message.To.Add(new MailboxAddress(client.Name, client.Email));
            message.Subject = "Agendamento de consulta";
            message.Body = new TextPart("Plain"){Text = MensagemCliente};

            SmtpClient smtp = new SmtpClient();
            try
            {
                smtp.Connect("smtp@gmail.com", 465, true);
                smtp.Authenticate(_SMTP_EMAIL, _SMTP_SENHA);
                smtp.Send(message);
            }   
            catch(Exception sm)
            {
                throw new DomainException("Error ao enviar email" + sm);
            }
            finally
            {
                smtp.Disconnect(true);
                smtp.Dispose();
            }

        }
    }
}
