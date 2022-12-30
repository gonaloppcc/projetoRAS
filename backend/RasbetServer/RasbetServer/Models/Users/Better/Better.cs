using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Models.Users.Better;

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
    public virtual IList<Transaction>? TransactionHist { get; set; }

    public Better(
        string id,
        string email,
        string username,
        string password,
        string nif,
        string cc,
        string cellphone,
        float balance
    ) : base(id, email, username, password) {
        Nif = nif;
        Cc = cc;
        Cellphone = cellphone;
        Balance = balance;
    }
    
    public Better(
        string email,
        string username,
        string password,
        string nif,
        string cc,
        string cellphone,
        float balance
    ) : base(email, username, password) {
        Nif = nif;
        Cc = cc;
        Cellphone = cellphone;
        Balance = balance;
    }
}