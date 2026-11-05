using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API;



[ApiController]
[Route("[controller]")]
public class LoginController(MyDatabaseConnection db, IConfiguration configuration) : ControllerBase
{

    [HttpPost]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        var user = db.Users().FirstOrDefault(u =>
            u.username == loginRequest.username && u.passwordhash == loginRequest.password);
        
        var admin = db.Admins().FirstOrDefault(a =>
            a.username == loginRequest.username &&
            a.passwordhash == loginRequest.password);

        var superUser = db.SuperUsers().FirstOrDefault(su =>
            su.username == loginRequest.username &&
            su.passwordhash == loginRequest.password);
        
        if (user == null && admin == null && superUser == null)
        {
            return Unauthorized();
        }
        

        var key = configuration["Jwt:Key"];

        if (string.IsNullOrEmpty(key))
        {
            throw new InvalidOperationException("JWT key is missing.");
        }

        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(key));

        var credentials = new SigningCredentials(
            securityKey,
            SecurityAlgorithms.HmacSha256);

        var username = user?.username ?? admin?.username ?? superUser!.username;
        var role = user?.role ?? admin?.role ?? superUser!.role;
        
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(ClaimTypes.Role, role)
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials
        );

        var tokenString = new JwtSecurityTokenHandler()
            .WriteToken(token);

        return Ok(new
        {
            token = tokenString,
            role = role
        });
    }
    
}