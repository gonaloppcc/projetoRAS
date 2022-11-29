namespace RasbetServer.Models;

public abstract class User
{
    public int? Id { get; protected set; }
    public string Email { get; protected set; }
    public string Username { get; protected set; }
    public string Password { get; protected set; }
    
    public User(
        int? id,
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
}