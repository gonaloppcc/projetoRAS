namespace RasbetServer.Models.Users;

public abstract class User
{
    public User(
        string? id,
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

    public string? Id { get; protected set; }
    public string Email { get; protected set; }
    public string Username { get; protected set; }
    public string Password { get; protected set; }
}