using ProjConsulta.Env;
using ProjConsulta.Data;
using ProjConsulta.Entities;
using ProjConsulta.Services;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;

using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});


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


builder.Services
    .AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });



var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();


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

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Auth}/{action=Login}/{id?}"
);

app.MapControllers();
app.UseCors("AllowAll")


app.Run();