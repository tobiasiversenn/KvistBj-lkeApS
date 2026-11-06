
using API.Security;
using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API;


public class UserQueries(MyDatabaseConnection db, IPasswordHasher passwordHasher) : ControllerBase
{
    [HttpGet(nameof(GetAllUsers))]
    [Authorize(Roles = "User,SuperUser,Admin")]

    public List<User> GetAllUsers()
    {
        return db.Users().ToList();
    }

    [HttpPost(nameof(PostUser))]
    [Authorize(Roles = "SuperUser,Admin")]

    public void PostUser(User user)
    {
        user.Id = Guid.NewGuid().ToString();
        user.role = "User";
        user.passwordhash = passwordHasher.HashAndSaltPassword(user.passwordhash);
        db.Insert(user);
    }

    [HttpDelete(nameof(DeleteUser))]
    [Authorize(Roles = "SuperUser,Admin")]

    public void DeleteUser(string userId)
    {
        var user = db.Users().FirstOrDefault(u => u.Id == userId);
        if (user != null)
            db.Delete(user);
    }

    [HttpPut(nameof(EditUser))]
    [Authorize(Roles = "SuperUser,Admin")]

    public void EditUser(string userId, string newUsername, string newPassword)
    
    {
        var user = db.Users().FirstOrDefault(u => u.Id == userId);
        user.username = newUsername;
        user.passwordhash = passwordHasher.HashAndSaltPassword(newPassword);
        db.Update(user);
    }
}
