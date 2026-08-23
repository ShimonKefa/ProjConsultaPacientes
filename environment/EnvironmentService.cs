namespace ProjConsulta.Env
{
    public class EnvironmentService
    {
        //public string DbFolderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ProjConsultas"); 
        public string DbFolderPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "ProjConsultas"); 
        public string DBFilePath => Path.Combine(DbFolderPath, "DBCOM.db");

        public string SenhaSMTP => Environment.GetEnvironmentVariable("SMTP_SENHA") ?? " ";
        public string EmailSender => Environment.GetEnvironmentVariable("SMTP_EMAIL")?? " "; 
        public EnvironmentService()
        {

        }
        public void EnsureCreated()
        {
            try
            {
                if (!Directory.Exists(DbFolderPath))
                {
                    Directory.CreateDirectory(DbFolderPath);
                }
                if (!File.Exists(DBFilePath))
                {
                    File.Create(DBFilePath).Dispose();
                }
            }
            catch (IOException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}