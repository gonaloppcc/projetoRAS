namespace RasbetServer.Models.Users;

public class Administrator : User {
    public Administrator(
        string email,
        string username,
        string password
    ) : base(email, username, password) {
    }
}