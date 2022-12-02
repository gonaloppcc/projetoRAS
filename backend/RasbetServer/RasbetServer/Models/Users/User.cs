using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace RasbetServer.Models.Users;

public abstract class User {
    [Key] public string? Id { get; protected set; }

    // TODO: Index this
    [Required] public string Email { get; protected set; }

    // TODO: Index this
    [Required] public string Username { get; protected set; }
    [Required] public string Password { get; protected set; }

    public User(
        string? id,
        string email,
        string username,
        string password
    ) {
        Id = id;
        Email = email;
        Username = username;
        Password = password;
    }
}