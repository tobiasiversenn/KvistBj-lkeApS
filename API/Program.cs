using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NSwag.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

var options = new DataOptions().UseSQLite(Environment.GetEnvironmentVariable("DB") ??"Data Source=dev.db");
builder.Services.AddSingleton(new DataOptions<MyDatabaseConnection>(options));

builder.Services.AddOpenApiDocument();

builder.Services.AddCors();
builder.Services.AddControllers();
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

}


app.UseCors(_ => _.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin().SetIsOriginAllowed(_ => true));
app.UseOpenApi();
app.UseSwaggerUi();
app.MapControllers();
app.Run();