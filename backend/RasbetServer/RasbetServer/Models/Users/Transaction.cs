using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Users;

public class Transaction
{
    public Transaction(float value)
    {
        Value = value;
    }

    public float Value { get; }

    public static Transaction FromJson(JObject json)
    {
        var value = json[nameof(Value)].Value<float>();

        return new Transaction(value);
    }
}