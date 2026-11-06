using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NSwag.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;using API.Security;

var builder = WebApplication.CreateBuilder(args);

var options = new DataOptions().UseSQLite(Environment.GetEnvironmentVariable("DB") ??"Data Source=dev.db");
builder.Services.AddSingleton(new DataOptions<MyDatabaseConnection>(options));

builder.Services.AddOpenApiDocument();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    builder.Configuration["Jwt:Key"]!
                )
            )
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped<MyDatabaseConnection>();
builder.Services.AddScoped<IPasswordHasher, Argon2PasswordHasher>();



var app =  builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyDatabaseConnection>();
    var passwordHasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

    db.CreateTable<User>(tableOptions: TableOptions.CreateIfNotExists);
    db.CreateTable<SuperUser>(tableOptions: TableOptions.CreateIfNotExists);
    db.CreateTable<Admin>(tableOptions: TableOptions.CreateIfNotExists);



    var users = db.Users().ToList();
    foreach (var u in users)
    {
        db.Delete(u);
    }
    
    var superusers = db.SuperUsers().ToList();
    foreach (var su in superusers)
    {
        db.Delete(su);
    }
    
    
    var admins = db.Admins().ToList();
    foreach (var a in admins)
    {
        db.Delete(a);
    }
    
    if (!db.Users().Any())
    {
        db.Insert(new User()
        {
            Id = Guid.NewGuid().ToString(),
            username = "James",
            passwordhash = passwordHasher.HashAndSaltPassword("password"),
            role = "User"

        });


        db.Insert(new User()
        {
            Id = Guid.NewGuid().ToString(),
            username = "Michael",
            passwordhash = passwordHasher.HashAndSaltPassword("password"),
            role = "User"

        });

        db.Insert(new User()
        {
            Id = Guid.NewGuid().ToString(),
            username = "Henry",
            passwordhash = passwordHasher.HashAndSaltPassword("password"),
            role = "User"

        });
    }

    if (!db.SuperUsers().Any())
    {

        db.Insert(new SuperUser()
        {
            Id = Guid.NewGuid().ToString(),
            username = "Kyle",
            passwordhash = "password",
            role = "SuperUser"


        });
    }

    if (!db.Admins().Any())
    {
        db.Insert(new Admin()
        {
            Id = Guid.NewGuid().ToString(),
            username = "Xenia",
            passwordhash = "password",
            role = "Admin"

        });
    }
    
    Console.WriteLine("KvistAndBjaelkeAps program has been started");
    foreach (var u in users)
    {
        Console.WriteLine(u.username);
        Console.WriteLine(u.passwordhash);
    }
}


app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

app.UseOpenApi();
app.UseSwaggerUi();
app.MapControllers();
app.Run();