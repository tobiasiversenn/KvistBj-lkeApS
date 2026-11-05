using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API;


[Authorize(Roles = "Admin")]
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
        admin.role = "Admin";
        db.Insert(admin);
    }

    [HttpDelete(nameof(DeleteAdmin))]
    public void DeleteAdmin(string adminId)
    {
        var admin = db.Admins().FirstOrDefault(a => a.Id == adminId);
        if (admin != null)
            db.Delete(admin);
    }
    
    
    [HttpPut(nameof(EditAdmin))]

    public void EditAdmin(string adminId, string newUsername, string newPassword)
    
    {
        var admin = db.Admins().FirstOrDefault(a => a.Id == adminId);
        admin.username = newUsername;
        admin.passwordhash = newPassword;
        db.Update(admin);
    }
    
}