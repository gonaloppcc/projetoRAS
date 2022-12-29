using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RasbetServer.Models.Users;

public class Transaction
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;
    [Required] public float Value { get; set; }

    public Transaction(float value) {
        Value = value;
    }
}