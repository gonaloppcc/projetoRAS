namespace RasbetServer.Models.Users;

public abstract class User
{
    public User() {}
    
    public User(
        ulong? id,
        string email,
        string username,
        string password
    )
    {
        Id = id;
        Email = email;
        Username = username;
        Password = password;
    }

    public ulong? Id { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}