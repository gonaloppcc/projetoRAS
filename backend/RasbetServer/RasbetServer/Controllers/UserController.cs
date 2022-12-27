using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Resources.Users;
using RasbetServer.Resources.Users.Better;
using RasbetServer.Resources.Users.Specialist;
using RasbetServer.Services.Users;
using Exception = System.Exception;

namespace RasbetServer.Controllers;

// TODO: Improve Try catch error handling
[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public UserController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    /// <summary>
    ///     Logs in a user
    /// </summary>
    /// <param name="creds">Credentials necessary for login</param>
    /// <returns>The logged in user or an error when the user either has invalid credentials or does not exist</returns>
    [HttpPost(Name = "Login")]
    public async Task<IActionResult> Login([FromBody] Credentials creds)
    {
        try {
            var user = await _userService.LoginAsync(creds.Email, creds.Password);
            var resource = _mapper.Map<User, UserResource>(user);
            return Ok(JsonConvert.SerializeObject(resource));
        }
        catch (Exception e) {
            return NotFound("User not found");
        }
    }

    [HttpPatch("balance", Name = "UpdateBalance")]
    public async Task<IActionResult> UpdateBalance([FromQuery] string id, [FromQuery] float balance)
    {
        try
        {
            var newBalance = await _userService.UpdateBalanceAsync(id, balance);
            //var resource = _mapper.Map<User, UserResource>(better);
            return Ok(JsonConvert.SerializeObject(newBalance));
        }
        catch (Exception e)
        {
            return NotFound("User not found");
        }
    }

    /// <summary>
    ///     Registers a better in the system
    /// </summary>
    /// <param name="betterResource">Better to register</param>
    /// <returns>
    ///     Ok in case the better was successfully registered
    ///     or BadRequest if the json is missing any attributes
    /// </returns>
    [HttpPost("betters", Name = "RegisterBetter")]
    public async Task<IActionResult> RegisterBetter([FromBody] SaveBetterResource betterResource)
    {
        try
        {
            var better = _mapper.Map<SaveBetterResource, Better>(betterResource);
            var newBetter = await _userService.RegisterAsync(better);
            var resource = _mapper.Map<User, UserResource>(newBetter);
            return Ok(JsonConvert.SerializeObject(resource));
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }

    /// <summary>
    ///     Registers a new specialist in the system
    /// </summary>
    /// <param name="specialistResource">Specialist to register</param>
    /// <returns>
    ///     Ok in the case the specialist was successfully registered
    ///     or BadRequest if the json is missing any attributes
    /// </returns>
    [HttpPost("specialists", Name = "RegisterSpecialist")]
    public async Task<IActionResult> RegisterSpecialist([FromBody] SaveSpecialistResource specialistResource)
    {
        try
        {
            var specialist = _mapper.Map<SaveSpecialistResource, Specialist>(specialistResource);
            var newSpecialist = await _userService.RegisterAsync(specialist);
            var resource = _mapper.Map<User, UserResource>(newSpecialist);
            return Ok(JsonConvert.SerializeObject(resource));
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    /// <summary>
    /// Replaces a users password with a new one
    /// </summary>
    /// <param name="id">User's id</param>
    /// <param name="json">Json object with the new password</param>
    /// <returns>The user with the updated password or BadRequest if the user does not exist</returns>
    [HttpPatch(Name = "ChangePassword")]
    public async Task<ActionResult<User>> ChangePassword([FromQuery] string id, [FromBody] JsonElement json)
    {
        var password = json.GetProperty("password").GetString();
        if (password is null)
            return BadRequest("No password provided");

        try
        {
            await _userService.ChangePasswordAsync(id, password);
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
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            await _userService.DeleteUserAsync(id);
            return Ok("User successfully deleted");
        }
        catch (Exception e)
        {
            return NotFound("User not found");
        }
    }
}