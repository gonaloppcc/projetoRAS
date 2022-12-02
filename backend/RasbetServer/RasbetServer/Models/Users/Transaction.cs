using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Users;

public class Transaction {
    [Key] public ulong? _id { get; set; }
    [Required] public float Value { get; set; }

    public Transaction(float value) {
        Value = value;
    }


    public static Transaction FromJson(JObject json) {
        var value = json[nameof(Value)].Value<float>();

        return new Transaction(value);
    }
}