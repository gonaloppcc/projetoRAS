using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users;

public class Specialist : User {
    [Required]
    public IList<Sport> Specialties { get; set; }
    
    public Specialist() : base() { }

    public Specialist(
        string id,
        string email,
        string username,
        string password,
        IEnumerable<Sport> specialties
    ) : base(id, email, username, password) {
        Specialties = specialties.ToList();
    }
    
    public Specialist(
        string email,
        string username,
        string password,
        IEnumerable<Sport> specialties
    ) : base(email, username, password) {
        Specialties = specialties.ToList();
    }
}