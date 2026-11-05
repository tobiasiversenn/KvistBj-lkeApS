
using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API;

[ApiController]
[Route("[controller]")]
public class UserController(MyDatabaseConnection db) : ControllerBase
{
    // All three roles can read users.
    [HttpGet(nameof(GetAllUsers))]
    [Authorize(Roles = "User,SuperUser,Admin")]
    public ActionResult<List<UserResponse>> GetAllUsers()
    {
        var users = db.Users()
            .Select(u => new UserResponse
            {
                Id = u.Id,
                Username = u.username,
                Role = u.role
            })
            .ToList();

        return Ok(users);
    }

    // Only SuperUsers and Admins can create users.
    [HttpPost(nameof(PostUser))]
    [Authorize(Roles = "SuperUser,Admin")]
    public IActionResult PostUser([FromBody] User user)
    {
        user.Id = Guid.NewGuid().ToString();
        user.role = "User";

        db.Insert(user);

        return Ok();
    }

    // Only SuperUsers and Admins can delete users.
    [HttpDelete(nameof(DeleteUser))]
    [Authorize(Roles = "SuperUser,Admin")]
    public IActionResult DeleteUser([FromQuery] string userId)
    {
        var user = db.Users().FirstOrDefault(u => u.Id == userId);

        if (user == null)
            return NotFound();

        db.Delete(user);

        return NoContent();
    }

    // Only SuperUsers and Admins can edit users.
    [HttpPut(nameof(EditUser))]
    [Authorize(Roles = "SuperUser,Admin")]
    public IActionResult EditUser(
        [FromQuery] string userId,
        [FromQuery] string newUsername,
        [FromQuery] string newPassword)
    {
        var user = db.Users().FirstOrDefault(u => u.Id == userId);

        if (user == null)
            return NotFound();

        user.username = newUsername;
        user.passwordhash = newPassword;

        db.Update(user);

        return Ok();
    }

    // Only Admins can edit Admins.
    [HttpPut(nameof(EditAdmin))]
    [Authorize(Roles = "Admin")]
    public IActionResult EditAdmin(
        [FromQuery] string adminId,
        [FromQuery] string newUsername,
        [FromQuery] string newPassword)
    {
        var admin = db.Admins().FirstOrDefault(a => a.Id == adminId);

        if (admin == null)
            return NotFound();

        admin.username = newUsername;
        admin.passwordhash = newPassword;

        db.Update(admin);

        return Ok();
    }

    // Only Admins can edit SuperUsers.
    [HttpPut(nameof(EditSuperUser))]
    [Authorize(Roles = "Admin")]
    public IActionResult EditSuperUser(
        [FromQuery] string superuserId,
        [FromQuery] string newUsername,
        [FromQuery] string newPassword)
    {
        var superuser = db.SuperUsers()
            .FirstOrDefault(su => su.Id == superuserId);

        if (superuser == null)
            return NotFound();

        superuser.username = newUsername;
        superuser.passwordhash = newPassword;

        db.Update(superuser);

        return Ok();
    }
}
