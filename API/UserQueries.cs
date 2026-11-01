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

    [HttpPut(nameof(EditUser))]
    public void EditUser(string userId, string newUsername, string newPassword)
    {
        var user = db.Users().FirstOrDefault(u => u.Id == userId);
        user.username = newUsername;
        user.passwordhash = newPassword;
        db.Update(user);
    }
    
    
    [HttpPut(nameof(EditAdmin))]
    public void EditAdmin(string adminId, string newUsername, string newPassword)
    {
        var admin = db.Admins().FirstOrDefault(a => a.Id == adminId);
        admin.username = newUsername;
        admin.passwordhash = newPassword;
        db.Update(admin);
    }
    
    [HttpPut(nameof(EditSuperUser))]
    public void EditSuperUser(string superuserId, string newUsername, string newPassword)
    {
        var superuser = db.SuperUsers().FirstOrDefault(su => su.Id == superuserId);
        superuser.username = newUsername;
        superuser.passwordhash = newPassword;
        db.Update(superuser);
    }
}