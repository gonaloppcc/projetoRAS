using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Users.Better;

public class SaveBetterResource : SaveUserResource
{
    [Required] public string Nif { get; set; }
    [Required] public string Cc { get; set; }
    [Required] public string Cellphone { get; set; }
}