namespace RasbetServer.Models;

public class Specialist : User
{
    public List<string> Specialtes { get; private set; }

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
}