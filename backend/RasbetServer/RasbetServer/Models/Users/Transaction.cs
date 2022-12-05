using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;

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


    public static Transaction FromJson(JObject json) {
        var value = json[nameof(Value)].Value<float>();

        return new Transaction(value);
    }
}