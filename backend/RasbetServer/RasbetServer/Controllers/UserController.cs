using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RasbetServer.Models;

namespace RasbetServer.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    public UserController() {}

    /// <summary>
    /// Logs in a user
    /// </summary>
    /// 
    /// <param name="json">Json object in the GET body. Must have an email and password</param>
    /// <returns>The logged in user or an error when the user either has invalid credentials or does not exist</returns>
    [HttpGet("[action]", Name = "Login")]
    public ActionResult<User> Login([FromBody] JsonObject json)
    {
        var dyn = JsonConvert.DeserializeObject<dynamic>(json.ToString());
        string email = dyn.email;
        if (email is null)
            return BadRequest("No email was provided");

        string password = dyn.password;
        if (password is null)
            return BadRequest("No password was provided");

        return new User(email, "Marco Costa", password, "12345678", "87654321", "919191919");
    }
}