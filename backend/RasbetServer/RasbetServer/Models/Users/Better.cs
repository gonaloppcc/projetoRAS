using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Users;

public class Better : User
{
    public Better(
        int? id,
        string email,
        string username,
        string password,
        string nif,
        string cc,
        string cellphone,
        float balance,
        IEnumerable<Transaction> transactionHist
    ) : base(id, email, username, password)
    {
        Nif = nif;
        Cc = cc;
        Cellphone = cellphone;
        Balance = balance;
        TransactionHist = transactionHist.ToList();
    }

    public string Nif { get; }
    public string Cc { get; }
    public string Cellphone { get; }
    public float Balance { get; }
    public List<Transaction> TransactionHist { get; }

    public static Better FromJson(JObject json)
    {
        int? id = null;
        var email = json[nameof(Email)].Value<string>();
        var username = json[nameof(Username)].Value<string>();
        var password = json[nameof(Password)].Value<string>();
        var nif = json[nameof(Nif)].Value<string>();
        var cc = json[nameof(Cc)].Value<string>();
        var cellphone = json[nameof(Cellphone)].Value<string>();
        var balance = json[nameof(Balance)].Value<float>();
        List<Transaction> transactions = new();

        return new Better(id, email, username, password, nif, cc, cellphone, balance, transactions);
    }
}