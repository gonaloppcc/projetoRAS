using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Extensions;
using RasbetServer.Models.Users;
using RasbetServer.Resources.Users;
using RasbetServer.Resources.Users.Better;
using RasbetServer.Resources.Users.Better.Transaction;
using RasbetServer.Resources.Users.Specialist;
using RasbetServer.Services.Users;

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
        var response = await _userService.LoginAsync(creds.Email, creds.Password);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        var resource = _mapper.Map<User, UserResource>(response.Object!);
        return Ok(resource);
    }

    [HttpPatch("balance", Name = "UpdateBalance")]
    public async Task<IActionResult> UpdateBalance([FromQuery] string id, [FromQuery] float balance)
    {
        var response = await _userService.UpdateBalanceAsync(id, balance);
        return response.Success ? 
             Ok(response.Object) : this.ProcessResponse(response);
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
        var better = _mapper.Map<SaveBetterResource, Better>(betterResource);
        var response = await _userService.RegisterAsync(better);
        if (!response.Success)
            return this.ProcessResponse(response);

        var resource = _mapper.Map<User, UserResource>(response.Object!);
        return Ok(resource);
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
        var specialist = _mapper.Map<SaveSpecialistResource, Specialist>(specialistResource);
        var response = await _userService.RegisterAsync(specialist);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        var resource = _mapper.Map<User, UserResource>(response.Object!);
        return Ok(resource);
    }

    /// <summary>
    /// Replaces a users password with a new one
    /// </summary>
    /// <param name="id">User's id</param>
    /// <param name="json">Json object with the new password</param>
    /// <returns>The user with the updated password or BadRequest if the user does not exist</returns>
    [HttpPatch("{id}/password", Name = "ChangePassword")]
    public async Task<IActionResult> ChangePassword(string id, [FromBody] JObject json)
    {
        var token = json["password"];
        if (token is null)
            return BadRequest("No password provided");
        var password = token.Value<string>()!;
        
        var response = await _userService.ChangePasswordAsync(id, password);
        return response.Success ? 
            Ok("Password changed successfully") : this.ProcessResponse(response);
    }

    /// <summary>
    /// Deletes a User from the system
    /// </summary>
    /// <param name="id">Id of the user to delete</param>
    /// <returns>Ok in case of a successful deletion or Not Found when the User does not exist</returns>
    [HttpDelete("{id}", Name = "DeleteUser")]
    public async Task<IActionResult> Delete(string id)
    {
        var response = await _userService.DeleteUserAsync(id);
        return response.Success ?
            Ok("User successfully deleted") : this.ProcessResponse(response);
    }

    [HttpGet("{id}/transactionHist", Name = "GetTransactionHist")]
    public async Task<IActionResult> GetTransactionHist(string id)
    {
        var response = await _userService.GetTransactionHist(id);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<IEnumerable<Transaction>, IEnumerable<TransactionResource>>(response.Object!));
    }
}