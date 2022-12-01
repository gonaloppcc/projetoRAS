using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Users;

public class Specialist : User
{
    public Specialist(
        string? id,
        string email,
        string username,
        string password,
        IEnumerable<string> specialties
    ) : base(id, email, username, password)
    {
        Specialties = specialties.ToList();
    }

    public List<string> Specialties { get; }

    public static Specialist FromJson(JObject json)
    {
        string? id = null;
        var email = json[nameof(Email)].Value<string>();
        var username = json[nameof(Username)].Value<string>();
        var password = json[nameof(Password)].Value<string>();
        List<string> specialties = new();

        foreach (var specialty in json[nameof(specialties)].Value<JArray>())
        {
            if (specialty is null)
                throw new JsonException();

            specialties.Add(specialty.Value<string>());
        }

        return new Specialist(id, email, username, password, specialties);
    }
}