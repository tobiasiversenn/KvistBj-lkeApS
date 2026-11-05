using Infrastructure;
using LinqToDB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API;

[ApiController]
[Route("[controller]")]
[Authorize(Roles = "SuperUser, Admin")]
public class SuperUserController(MyDatabaseConnection db) : ControllerBase
{
    [HttpGet(nameof(GetAllSuperUsers))]
    public ActionResult<List<SuperUser>> GetAllSuperUsers()
    {
        return Ok(db.SuperUsers().ToList());
    }

    [HttpPost(nameof(PostSuperUser))]
    public IActionResult PostSuperUser([FromBody] SuperUser superUser)
    {
        superUser.Id = Guid.NewGuid().ToString();
        superUser.role = "SuperUser";

        db.Insert(superUser);

        return Ok();
    }

    [HttpDelete(nameof(DeleteSuperUser))]
    public IActionResult DeleteSuperUser(
        [FromQuery] string superUserId)
    {
        var superUser = db.SuperUsers()
            .FirstOrDefault(su => su.Id == superUserId);

        if (superUser == null)
            return NotFound();

        db.Delete(superUser);

        return NoContent();
    }
}