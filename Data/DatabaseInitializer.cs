using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProjConsulta.Entities;
using ProjConsulta.Env;

namespace ProjConsulta.Data;

public static class DatabaseInitializer
{
    public const string InitialAdminEmail = "admin@clinicavitta.com";
    public const string InitialAdminPassword = "Vitta@2026!";

    public static void EnsureAdminCreation(DBCOM context, IPasswordHasher<AppUser> passwordHasher)
    {
        // Mantém as tabelas existentes e cria apenas as tabelas ausentes em um banco já criado.
        context.Database.EnsureCreated();
        // context.Database.ExecuteSqlRaw(
        //     """
        //     CREATE TABLE IF NOT EXISTS "users" (
        //         "ID" TEXT NOT NULL CONSTRAINT "PK_users" PRIMARY KEY,
        //         "Name" TEXT NOT NULL,
        //         "Email" TEXT NOT NULL,
        //         "PasswordHash" TEXT NOT NULL,
        //         "Role" TEXT NOT NULL,
        //         "IsActive" INTEGER NOT NULL
        //     );
        //     """);
        // context.Database.ExecuteSqlRaw(
        //     "CREATE UNIQUE INDEX IF NOT EXISTS \"IX_users_Email\" ON \"users\" (\"Email\");");

        var initialAdmin = context.users.SingleOrDefault(user => user.Email == InitialAdminEmail);
        if (initialAdmin is not null)
        {
            return;
        }
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
}
