using ProjConsulta.Env;
using ProjConsulta.Data;
using ProjConsulta.Services;
using System.Data.Common;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
EnvironmentService env = new EnvironmentService();
using var dbcontext = new DBCOM();
env.EnsureCreated();
dbcontext.Database.EnsureCreated();    
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<DBCOM>();
builder.Services.AddScoped<ClientService>();
builder.Services.AddScoped<DoctorServices>();
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });
var app = builder.Build();
app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();
