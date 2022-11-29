namespace RasbetServer.Models.Users;

public class Administrator : User
{
    public Administrator(
        int? id,
        string email,
        string username,
        string password
    ) : base(id, email, username, password)
    {
    }
}