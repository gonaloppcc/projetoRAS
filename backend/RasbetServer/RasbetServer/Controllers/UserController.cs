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

    /// <summary>
    /// Registers a user in the system
    /// </summary>
    /// 
    /// <param name="json">
    /// Json object in the body of the POST request.
    /// Must have all the fields required to create a new User class
    /// </param>
    /// <returns>
    /// Ok in case the user was successfully registered
    /// or BadRequest if the json is missing any atributes
    /// </returns>
    [HttpPost("[action]", Name = "Register")]
    public IActionResult Register([FromBody] JsonObject json)
    {
        var dyn = JsonConvert.DeserializeObject<dynamic>(json.ToString());
        
        string email = dyn.email;
        if (email is null)
            return BadRequest("No email was provided");
        string username = dyn.username;
        if (username is null)
            return BadRequest("No username was provided");
        string password = dyn.password;
        if (password is null)
            return BadRequest("No password was provided");
        string nif = dyn.nif;
        if (nif is null)
            return BadRequest("No nif was provided");
        string cc = dyn.cc;
        if (cc is null)
            return BadRequest("No CC was provided");
        string cellphone = dyn.cellphone;
        if (cellphone is null)
            return BadRequest("No cellphone number was provided");

        var user = new User(email, username, password, nif, cc, cellphone);
        return Ok("User successfully created");
    }
}