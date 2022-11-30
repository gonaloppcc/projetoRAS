using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Users;

public class Transaction
{
    public Transaction() {}
    
    public Transaction(ulong? id, float value, ulong betterId, Better? better)
    {
        Id = id;
        Value = value;
        BetterId = betterId;
        Better = better;
    }

    public ulong? Id { get; set; }
    public float Value { get; set; }
    public ulong BetterId { get; set; }
    public Better? Better { get; set; }

    public static Transaction FromJson(JObject json)
    {
        var value = json[nameof(Value)].Value<float>();
        var betterId = json[nameof(BetterId)].Value<ulong>();

        return new Transaction(null, value, betterId, null);
    }
}