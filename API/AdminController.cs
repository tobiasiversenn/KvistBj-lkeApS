using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController(MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllAdmins))]
    public ActionResult<List<Admin>> GetAllAdmins()
    {
        return Ok(db.Admins().ToList());
    }

    [HttpPost(nameof(PostAdmin))]
    public IActionResult PostAdmin([FromBody] Admin admin)
    {
        admin.Id = Guid.NewGuid().ToString();
        admin.role = "Admin";

        db.Insert(admin);

        return Ok();
    }

    [HttpDelete(nameof(DeleteAdmin))]
    public IActionResult DeleteAdmin([FromQuery] string adminId)
    {
        var admin = db.Admins().FirstOrDefault(a => a.Id == adminId);

        if (admin == null)
            return NotFound();

        db.Delete(admin);

        return NoContent();
    }
}