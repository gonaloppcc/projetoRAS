using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Users;

namespace RasbetServer.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    /// TODO: Implement user logging in once database is created
    /// <summary>
    ///     Logs in a user
    /// </summary>
    /// <param name="json">Json object in the GET body. Must have an email and password</param>
    /// <returns>The logged in user or an error when the user either has invalid credentials or does not exist</returns>
    [HttpGet(Name = "Login")]
    public IActionResult Login([FromBody] JsonElement json)
    {
        var email = json.GetProperty("email").GetString();
        var password = json.GetProperty("password").GetString();

        if (email is null || password is null)
            return BadRequest();

        return Ok("Success");
    }


    /// TODO: Implement user creation once we have a working database
    /// <summary>
    ///     Registers a better in the system
    /// </summary>
    /// <param name="json">Json with the info to register the new better</param>
    /// <returns>
    ///     Ok in case the better was successfully registered
    ///     or BadRequest if the json is missing any attributes
    /// </returns>
    [HttpPost("better", Name = "RegisterBetter")]
    public IActionResult RegisterBetter([FromBody] JsonElement json)
    {
        var better = Better.FromJson(JObject.Parse(json.ToString()));
        return Ok("Better successfully created");
    }

    /// <summary>
    ///     Registers a new specialist in the system
    /// </summary>
    /// <param name="json">Json with the info to register the new specialist</param>
    /// <returns>
    ///     Ok in the case the specialist was successfully registered
    ///     or BadRequest if the json is missing any attributes
    /// </returns>
    [HttpPost("specialist", Name = "RegisterSpecialist")]
    public IActionResult RegisterSpecialist([FromBody] JsonElement json)
    {
        var specialist = Specialist.FromJson(JObject.Parse(json.ToString()));
        return Ok("Specialist successfully created");
    }

    /// TODO: Implement this function properly once we have a working database 
    /// <summary>
    /// Replaces a users password with a new one
    /// </summary>
    /// <param name="id">User's id</param>
    /// <param name="json">Json object with the new password</param>
    /// <returns>The user with the updated password or BadRequest if the user does not exist</returns>
    [HttpPatch(Name = "ChangePassword")]
    public ActionResult<User> ChangePassword([FromQuery] string id, [FromBody] JsonElement json)
    {
        if (id == "MockInvalidId")
            return NotFound($"User with id={id} not found");
        
        string? password = json.GetProperty("password").GetString();
        if (password is null)
            return BadRequest("No password provided");
        
        return Ok("Password changed successfully");
    }

    /// TODO: Implement this properly when we have a working database
    /// <summary>
    /// Deletes a User from the system
    /// </summary>
    /// <param name="id">Id of the user to delete</param>
    /// <returns>Ok in case of a successful deletion or Not Found when the User does not exist</returns>
    [HttpDelete(Name = "DeleteUser")]
    public IActionResult Delete([FromQuery] string id)
    {
        if (id == "MockInvalidId")
            return NotFound($"User with id={id} not found");

        return Ok("User successfully deleted");
    }
}