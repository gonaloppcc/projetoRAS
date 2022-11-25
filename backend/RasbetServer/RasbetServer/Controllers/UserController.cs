using Microsoft.AspNetCore.Mvc;
using RasbetServer.Models;

namespace RasbetServer.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    public UserController() {}

    [HttpGet("{email}/{password}", Name = "Login")]
    public ActionResult<User> Login(string email, string password)
    {
        return new User(email, "Marco Costa", password, "12345678", "87654321", "919191919");
    }
}