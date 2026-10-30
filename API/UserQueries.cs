using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class UserQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllUsers))]
    public List<User> GetAllUsers()
    {
        return db.Users().ToList();
    }

    [HttpPost(nameof(PostUser))]
    public void PostUser(User user)
    {
        user.Id = Guid.NewGuid().ToString();
        db.Insert(user);
    }

    [HttpDelete(nameof(DeleteUser))]
    public void DeleteUser(string userId)
    {
        var user = db.Users().FirstOrDefault(u => u.Id == userId);
        if (user != null)
        db.Delete(user);
    }
    
    
}