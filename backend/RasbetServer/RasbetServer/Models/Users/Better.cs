using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Users;

public class Better : User {
    [Required]
    [StringLength(9)]
    public string Nif { get; set; }
    
    [Required]
    [StringLength(9)]
    public string Cc { get; set; }
    
    [Required]
    [StringLength(9)]
    public string Cellphone { get; set; }
    
    [Required]
    public float Balance { get; set; }
    
    [Required]
    public IList<Transaction> TransactionHist { get; set; }

    public Better(): base() {
    }
    
    public Better(
        string id,
        string email,
        string username,
        string password,
        string nif,
        string cc,
        string cellphone,
        float balance,
        IEnumerable<Transaction> transactionHist
    ) : base(id, email, username, password) {
        Nif = nif;
        Cc = cc;
        Cellphone = cellphone;
        Balance = balance;
        TransactionHist = transactionHist.ToList();
    }
    
    public Better(
        string email,
        string username,
        string password,
        string nif,
        string cc,
        string cellphone,
        float balance,
        IEnumerable<Transaction> transactionHist
    ) : base(email, username, password) {
        Nif = nif;
        Cc = cc;
        Cellphone = cellphone;
        Balance = balance;
        TransactionHist = transactionHist.ToList();
    }

    public static Better FromJson(JObject json) {
        var email = json[nameof(Email)].Value<string>();
        var username = json[nameof(Username)].Value<string>();
        var password = json[nameof(Password)].Value<string>();
        var nif = json[nameof(Nif)].Value<string>();
        var cc = json[nameof(Cc)].Value<string>();
        var cellphone = json[nameof(Cellphone)].Value<string>();
        List<Transaction> transactions = new();

        return new Better(email, username, password, nif, cc, cellphone, 0, transactions);
    }
}