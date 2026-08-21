using ProjConsulta.Env;
using ProjConsulta.Data;
using System.Data.Common;

var builder = WebApplication.CreateBuilder(args);
EnvironmentService env = new EnvironmentService();
using var dbcontext = new DBCOM();
env.EnsureCreated();
dbcontext.Database.EnsureCreated();    



// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.Run();
