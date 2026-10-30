using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace API;

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
        db.Insert(superUser);
    }

    [HttpDelete(nameof(DeleteSuperUser))]
    public void DeleteSuperUser(string superUserId)
    {
        var superUser = db.SuperUsers().FirstOrDefault(su => su.Id == superUserId);
        if (superUser != null)
            db.Delete(superUser);
    }
    
    
}