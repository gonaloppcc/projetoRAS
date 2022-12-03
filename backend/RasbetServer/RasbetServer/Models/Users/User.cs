using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

namespace RasbetServer.Models.Users;

[Index(nameof(Email), IsUnique = true)]
public abstract class User {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; }

    // TODO: Index this
    [Required] public string Email { get; set; }

    // TODO: Index this
    [Required] public string Username { get; set; }
    [Required] public string Password { get; set; }

    public User() {
    }

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