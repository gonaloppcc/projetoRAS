using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RasbetServer.Models.Users.Better;

public class Transaction
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; }
    
    [Required]
    public TransactionTypes Type { get; private set; }

    [Required]
    public DateTime Date { get; private set; }
    
    [Required] 
    public float Value { get; private set; }
    
    [Required]
    public float BalanceAfter { get; private set; }
    
    public Transaction(TransactionTypes type, DateTime date, float value, float balanceAfter) 
    {
        Type = type;
        Date = date;
        Value = value;
        BalanceAfter = balanceAfter;
    }
}