using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API;

[Authorize(Roles = "SuperUser, Admin")]

public class SuperUserQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllSuperUsers))]
    public List<SuperUser> GetAllSuperUsers()
    {
        return db.SuperUsers().ToList();
    }

    [HttpPost(nameof(PostSuperUser))]
    public void PostSuperUser(SuperUser superUser)
    {
        superUser.Id = Guid.NewGuid().ToString();
        superUser.role = "SuperUser";
        db.Insert(superUser);
    }

    [HttpDelete(nameof(DeleteSuperUser))]
    public void DeleteSuperUser(string superUserId)
    {
        var superUser = db.SuperUsers().FirstOrDefault(su => su.Id == superUserId);
        if (superUser != null)
            db.Delete(superUser);
    }
    
    
    
    [HttpPut(nameof(EditSuperUser))]

    public void EditSuperUser(string superUserId, string newUsername, string newPassword)
    
    {
        var superUser = db.SuperUsers().FirstOrDefault(su => su.Id == superUserId);
        superUser.username = newUsername;
        superUser.passwordhash = newPassword;
        db.Update(superUser);
    }
}