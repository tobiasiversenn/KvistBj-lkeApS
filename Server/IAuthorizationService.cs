namespace Server;

public interface IAuthorizationService
{

    string GenerateToken(string username, string password);

}