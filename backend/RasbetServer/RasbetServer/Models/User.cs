namespace RasbetServer.Models;

public class User
{
    public string Email { get; private set; }
    public string Username { get; private set; }
    public string Password { get; private set; }
    public string Nif { get; private set; }
    public string Cc { get; private set; }
    public string Cellphone { get; private set; }

    public User(
        string email,
        string username,
        string password,
        string nif,
        string cc,
        string cellphone
    )
    {
        Email = email;
        Username = username;
        Password = password;
        Nif = nif;
        Cc = cc;
        Cellphone = cellphone;
    }
}