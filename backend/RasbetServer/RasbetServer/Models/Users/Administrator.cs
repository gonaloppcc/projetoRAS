namespace RasbetServer.Models.Users;

public class Administrator : User {
    public Administrator(
        string id,
        string email,
        string username,
        string password
    ) : base(id, email, username, password) {
    }
    
    public Administrator(
        string email,
        string username,
        string password
    ) : base(email, username, password) {
    }
}