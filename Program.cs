using ProjConsulta.Env;
using ProjConsulta.Data;
using ProjConsulta.Entities;
using ProjConsulta.Services;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;

using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ============================================================
// SERVIÇOS
// ============================================================

// OpenAPI
builder.Services.AddOpenApi();

// Banco de dados
builder.Services.AddDbContext<DBCOM>();

// Serviços da aplicação
builder.Services.AddScoped<ClientService>();
builder.Services.AddScoped<DoctorServices>();
builder.Services.AddScoped<AuthService>();

// Hash de senha
builder.Services.AddScoped<
    IPasswordHasher<AppUser>,
    PasswordHasher<AppUser>
>();

// ============================================================
// AUTENTICAÇÃO
// ============================================================

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Auth/Login";
        options.AccessDeniedPath = "/Auth/Login";

        options.Cookie.Name = "ClinicaVitta.Auth";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;

        options.SlidingExpiration = true;
    });

builder.Services.AddAuthorization();

// ============================================================
// CONTROLLERS + VIEWS
// ============================================================

builder.Services
    .AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

// ============================================================
// CONSTRUÇÃO DA APLICAÇÃO
// ============================================================

var app = builder.Build();

// ============================================================
// CONFIGURAÇÃO DO PIPELINE
// ============================================================

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

// ============================================================
// INICIALIZAÇÃO DO BANCO E ADMIN
// ============================================================

using (var scope = app.Services.CreateScope())
{
    var environment = new EnvironmentService();
    environment.EnsureCreated();

    var context =
        scope.ServiceProvider.GetRequiredService<DBCOM>();

    var passwordHasher =
        scope.ServiceProvider
            .GetRequiredService<IPasswordHasher<AppUser>>();

    DatabaseInitializer.EnsureAdminCreation(
        context,
        passwordHasher
    );
}

// ============================================================
// ROTAS
// ============================================================

// Rota padrão para MVC
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Login}/{id?}"
);

// Mantém os Controllers/API com [Route]
app.MapControllers();

// ============================================================
// EXECUÇÃO
// ============================================================

app.Run();