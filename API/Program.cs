using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NSwag.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

//Next 16 or so lines are AI generated
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


var app =  builder.Build();
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MyDatabaseConnection>();
    db.CreateTable<User>(tableOptions: TableOptions.CreateIfNotExists);
    db.CreateTable<SuperUser>(tableOptions: TableOptions.CreateIfNotExists);
    db.CreateTable<Admin>(tableOptions: TableOptions.CreateIfNotExists);



    if (!db.Users().Any())
    {
        db.Insert(new User()
        {
            Id = Guid.NewGuid().ToString(),
            username = "James",
            passwordhash = "password",
            role = "User"

        });


        db.Insert(new User()
        {
            Id = Guid.NewGuid().ToString(),
            username = "Michael",
            passwordhash = "password",
            role = "User"

        });

        db.Insert(new User()
        {
            Id = Guid.NewGuid().ToString(),
            username = "Henry",
            passwordhash = "password",
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
    
    // TEMPORARY DEBUGGING CODE
    Console.WriteLine("=== JAMES DEBUG ===");

    var james = db.Users()
        .FirstOrDefault(u => u.username == "James");

    if (james != null)
    {
        Console.WriteLine($"Username: {james.username}");
        Console.WriteLine($"Password field: {james.passwordhash}");
        Console.WriteLine($"Password matches: {james.passwordhash == "password"}");
    }
    else
    {
        Console.WriteLine("James not found");
    }

    Console.WriteLine("===================");

}


app.UseCors("AllowFrontend");
//Two lines below are AI generated
app.UseAuthentication();
app.UseAuthorization();

app.UseOpenApi();
app.UseSwaggerUi();
app.MapControllers();
app.Run();