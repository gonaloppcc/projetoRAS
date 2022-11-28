using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RasbetServer.Models;
using RasbetServer.Models.Users;

namespace RasbetServer.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    public UserController() {}

    /// TODO: Implement user logging in once database is created
    /// <summary>
    /// Logs in a user
    /// </summary>
    /// 
    /// <param name="json">Json object in the GET body. Must have an email and password</param>
    /// <returns>The logged in user or an error when the user either has invalid credentials or does not exist</returns>
    [HttpGet("[action]", Name = "Login")]
    public ActionResult<User> Login([FromBody] JsonObject json)
    {
        var deserialized = JsonConvert.DeserializeObject<dynamic>(json.ToString());
        string email = deserialized.email;
        if (email is null)
            return BadRequest("No email was provided");

        string password = deserialized.password;
        if (password is null)
            return BadRequest("No password was provided");

        return new Better(email, "Marco Costa", password, "12345678", "87654321", "919191919", 0.25f);
    }

    
    /// TODO: Implement user creation once we have a working database
    /// <summary>
    /// Registers a user in the system
    /// </summary>
    /// 
    /// <param name="user">
    /// The user to register in the system
    /// </param>
    /// <returns>
    /// Ok in case the user was successfully registered
    /// or BadRequest if the json is missing any attributes
    /// </returns>
    [HttpPost("[action]", Name = "Register")]
    public IActionResult Register([FromBody] User user)
    {
        return Ok("User successfully created");
    }

    /// TODO: Implement this function properly once we have a working database 
    /// <summary>
    /// Replaces a users password with a new one
    /// </summary>
    /// <param name="id">User's id</param>
    /// <param name="json">Json object with the new password</param>
    /// <returns>The user with the updated password or BadRequest if the user does not exist</returns>
    [HttpPatch("[action]", Name = "ChangePassword")]
    public ActionResult<User> ChangePassword([FromQuery] int id, [FromBody] JsonObject json)
    {
        if (id == 0)
            return NotFound($"User with id={id} not found");
        
        var deserialized = JsonConvert.DeserializeObject<dynamic>(json.ToString());
        string password = deserialized.password;
        if (password is null)
        {
            return BadRequest("No password was provided");
        }
        
        return new Better("email@email.com", "TempUsername", password, "TemplateNIF", "Imagine a CC Here", "Cell num123", 0.50f);
    }

    /// TODO: Implement this properly when we have a working database
    /// <summary>
    /// Deletes a User from the system
    /// </summary>
    /// <param name="id">Id of the user to delete</param>
    /// <returns>Ok in case of a successful deletion or Not Found when the User does not exist</returns>
    [HttpDelete("[action]", Name = "DeleteUser")]
    public IActionResult Delete([FromQuery] int id)
    {
        if (id == 0)
            return NotFound($"User with id={id} not found");

        return Ok("User successfully deleted");
    }
}