namespace RasbetServer.Resources.Users;

public abstract class UserResource
{
    public abstract string Type { get; }
    
    public string Id { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
}