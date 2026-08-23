using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using ProjConsulta.Env;
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

        MimeMessage message = new MimeMessage();
        //sender
        message



        

    }
}