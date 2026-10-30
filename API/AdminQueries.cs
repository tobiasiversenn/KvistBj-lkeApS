using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class AdminQueries (MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllAdmins))]
    public List<Admin> GetAllAdmins()
    {
        return db.Admins().ToList();
    }

    [HttpPost(nameof(PostAdmin))]
    public void PostAdmin(Admin admin)
    {
        admin.Id = Guid.NewGuid().ToString();
        db.Insert(admin);
    }

    [HttpDelete(nameof(DeleteAdmin))]
    public void DeleteAdmin(string adminId)
    {
        var admin = db.Admins().FirstOrDefault(a => a.Id == adminId);
        if (admin != null)
            db.Delete(admin);
    }
    
    
}