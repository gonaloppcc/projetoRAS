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

    /// 
    [HttpGet("[action]", Name = "Login")]
    public ActionResult<User> Login([FromBody] JsonObject json)
    {
        var dyn = JsonConvert.DeserializeObject<dynamic>(json.ToString());
        string email = dyn.email;
        string password = dyn.password;
        
        return new User(email, "Marco Costa", password, "12345678", "87654321", "919191919");
    }
}