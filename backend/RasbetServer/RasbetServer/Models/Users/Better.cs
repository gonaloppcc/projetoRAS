using System.Text.Json;
using Newtonsoft.Json;
using JsonException = System.Text.Json.JsonException;

namespace RasbetServer.Models.Users;

public class Better : User
{
    public string Nif { get; }
    public string Cc { get; }
    public string Cellphone { get; set; }
    
    public float Balance { get; set; }

    public Better(
        string email, 
        string username, 
        string password,
        string nif,
        string cc,
        string cellphone,
        float balance
    ) : base(email, username, password)
    {
        Nif = nif;
        Cc = cc;
        Cellphone = cellphone;
        Balance = balance;
    }

    public static Better FromJson(JsonElement json)
    {
        string? email = json.GetProperty("Email").GetString();
        string? username = json.GetProperty("Username").GetString();
        string? password = json.GetProperty("Password").GetString();
        string? nif = json.GetProperty("Nif").GetString();
        string? cc = json.GetProperty("Cc").GetString();
        string? cellphone = json.GetProperty("Cellphone").GetString();
        decimal balance = json.GetProperty("Balance").GetDecimal();

        if (
            email is null ||
            username is null ||
            password is null ||
            nif is null ||
            cc is null ||
            cellphone is null
        )
            throw new JsonException();

        return new Better(email, username, password, nif, cc, cellphone, (float) balance);
    }
}