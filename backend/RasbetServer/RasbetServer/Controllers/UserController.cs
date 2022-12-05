using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.UserRepository;
using Exception = System.Exception;

namespace RasbetServer.Controllers;

// TODO: Improve Try catch error handling
[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    /// <summary>
    ///     Logs in a user
    /// </summary>
    /// <param name="json">Json object in the GET body. Must have an email and password</param>
    /// <returns>The logged in user or an error when the user either has invalid credentials or does not exist</returns>
    [HttpPost(Name = "Login")]
    public IActionResult Login([FromBody] JsonElement json)
    {
        var email = json.GetProperty("email").GetString();
        var password = json.GetProperty("password").GetString();

        if (email is null || password is null)
            return BadRequest();

        try {
            var user = _userRepository.LoginUser(email, password);
            return Ok(JsonConvert.SerializeObject(user));
        }
        catch (Exception e) {
            return NotFound("User not found");
        }
    }

    [HttpPatch("balance", Name = "UpdateBalance")]
    public IActionResult UpdateBalance([FromQuery] string id, [FromQuery] float balance)
    {
        try
        {
            var better = _userRepository.UpdateBalance(id, balance);
            return Ok(JsonConvert.SerializeObject(better));
        }
        catch (Exception e)
        {
            return NotFound("User not found");
        }
    }

    /// <summary>
    ///     Registers a better in the system
    /// </summary>
    /// <param name="json">Json with the info to register the new better</param>
    /// <returns>
    ///     Ok in case the better was successfully registered
    ///     or BadRequest if the json is missing any attributes
    /// </returns>
    [HttpPost("betters", Name = "RegisterBetter")]
    public IActionResult RegisterBetter([FromBody] JsonElement json)
    {
        try
        {
            var better = Better.FromJson(JObject.Parse(json.ToString()));
            return Ok(JsonConvert.SerializeObject(_userRepository.AddUser(better)));
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }

    /// <summary>
    ///     Registers a new specialist in the system
    /// </summary>
    /// <param name="json">Json with the info to register the new specialist</param>
    /// <returns>
    ///     Ok in the case the specialist was successfully registered
    ///     or BadRequest if the json is missing any attributes
    /// </returns>
    [HttpPost("specialists", Name = "RegisterSpecialist")]
    public IActionResult RegisterSpecialist([FromBody] JsonElement json)
    {
        try
        {
            var specialist = Specialist.FromJson(JObject.Parse(json.ToString()));
            var newSpecialist = _userRepository.AddUser(specialist);
            return Ok(JsonConvert.SerializeObject(newSpecialist));
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }

    /// <summary>
    /// Replaces a users password with a new one
    /// </summary>
    /// <param name="id">User's id</param>
    /// <param name="json">Json object with the new password</param>
    /// <returns>The user with the updated password or BadRequest if the user does not exist</returns>
    [HttpPatch(Name = "ChangePassword")]
    public ActionResult<User> ChangePassword([FromQuery] string id, [FromBody] JsonElement json)
    {
        string? password = json.GetProperty("password").GetString();
        if (password is null)
            return BadRequest("No password provided");

        try
        {
            _userRepository.ChangePassword(id, password);
            return Ok("Password changed successfully");
        }
        catch (Exception e)
        {
            return NotFound("User not found");
        }
    }

    /// <summary>
    /// Deletes a User from the system
    /// </summary>
    /// <param name="id">Id of the user to delete</param>
    /// <returns>Ok in case of a successful deletion or Not Found when the User does not exist</returns>
    [HttpDelete("{id}", Name = "DeleteUser")]
    public IActionResult Delete(string id)
    {
        try
        {
            _userRepository.DeleteUser(id);
            return Ok("User successfully deleted");
        }
        catch (Exception e)
        {
            return NotFound("User not found");
        }
    }
}