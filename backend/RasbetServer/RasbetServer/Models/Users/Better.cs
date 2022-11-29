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
        var email = json["email"].Value<string>();
        var username = json["username"].Value<string>();
        var password = json["password"].Value<string>();
        var nif = json["nif"].Value<string>();
        var cc = json["cc"].Value<string>();
        var cellphone = json["cellphone"].Value<string>();
        var balance = json["balance"].Value<float>();
        List<Transaction> transactions = new();

        return new Better(id, email, username, password, nif, cc, cellphone, balance, transactions);
    }
}