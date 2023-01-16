using System.ComponentModel.DataAnnotations;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users;

public class Specialist : User {
    [Required]
    public virtual IList<Sport>? Specialties { get; set; }

    public Specialist(
        string id,
        string email,
        string username,
        string password
    ) : base(id, email, username, password)
    { }
    
    public Specialist(
        string email,
        string username,
        string password
    ) : base(email, username, password) 
    { }
}