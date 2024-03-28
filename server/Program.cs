global using server.Models;
global using server.Data;
global using MongoDB.Bson;
global using MongoDB.Bson.Serialization.Attributes;
global using MongoDB.Driver;
global using Microsoft.Extensions.Options;
global using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyAllowSpecificOrigins",
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                      });
});


// Add services to the container.
builder.Services.Configure<SCSharpDatabaseSettings>(builder.Configuration.GetSection("SCSharpDatabaseSettings"));
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(
    options=>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
);

builder.Services.AddSingleton<MyUploadDownSetting>();
// builder.Services.AddSingleton<VisitorService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("MyAllowSpecificOrigins");

app.Run();
