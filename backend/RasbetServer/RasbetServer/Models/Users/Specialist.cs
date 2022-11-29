using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Users;

public class Specialist : User
{
    public Specialist(
        int? id,
        string email,
        string username,
        string password,
        IEnumerable<string> specialties
    ) : base(id, email, username, password)
    {
        Specialtes = specialties.ToList();
    }

    public List<string> Specialtes { get; }

    public static Specialist FromJson(JObject json)
    {
        int? id = null;
        var email = json["email"].Value<string>();
        var username = json["username"].Value<string>();
        var password = json["password"].Value<string>();
        List<string> specialties = new();

        foreach (var specialty in json["specialties"].Value<JArray>())
        {
            if (specialty is null)
                throw new JsonException();

            specialties.Add(specialty.Value<string>());
        }

        return new Specialist(id, email, username, password, specialties);
    }
}