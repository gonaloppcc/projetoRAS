using Newtonsoft.Json;

namespace RasbetServer.Models.Users;

public abstract class User
{
    public string Email { get; }
    public string Username { get; set; }
    public string Password { get; }

    public User(string email, string username, string password)
    {
        Email = email;
        Username = username;
        Password = password;
    }

    public virtual string ToJson(JsonSerializerSettings settings)
        => JsonConvert.SerializeObject(this, settings);
}