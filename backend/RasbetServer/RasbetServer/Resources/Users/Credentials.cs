using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Users;

public class Credentials
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}