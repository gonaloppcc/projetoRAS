using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users;

public class Specialist : User {
    [Required]
    public virtual List<SportSpecialistIds> Specialties { get; set; }
    
    public Specialist() : base() { }

    public Specialist(
        string id,
        string email,
        string username,
        string password,
        IEnumerable<SportSpecialistIds> specialties
    ) : base(id, email, username, password) {
        Specialties = specialties.ToList();
    }
    
    public Specialist(
        string email,
        string username,
        string password,
        IEnumerable<SportSpecialistIds> specialties
    ) : base(email, username, password) {
        Specialties = specialties.ToList();
    }


    public static Specialist FromJson(JObject json) {
        var email = json[nameof(Email)].Value<string>();
        var username = json[nameof(Username)].Value<string>();
        var password = json[nameof(Password)].Value<string>();
        List<SportSpecialistIds> specialties = new();

        foreach (var specialty in json[nameof(Specialties)].Value<JArray>()) {
            if (specialty is null)
                throw new JsonException();

            specialties.Add(SportSpecialistIds.FromJson(specialty.ToObject<JObject>()));
        }

        return new Specialist(email, username, password, specialties);
    }
}