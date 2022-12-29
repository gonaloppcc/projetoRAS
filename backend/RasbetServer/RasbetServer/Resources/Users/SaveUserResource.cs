using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Users;

public abstract class SaveUserResource
{
    [Required] public string Email { get; set; }
    [Required] public string Username { get; set; }
    [Required] public string Password { get; set; }
}