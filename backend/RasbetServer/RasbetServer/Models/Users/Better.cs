namespace RasbetServer.Models;

public class Better : User
{
    public string Nif { get; private set; }
    public string Cc { get; private set; }
    public string Cellphone { get; private set; }
    public float Balance { get; private set; }
    public List<Transaction> TransactionHist { get; private set; }

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
}