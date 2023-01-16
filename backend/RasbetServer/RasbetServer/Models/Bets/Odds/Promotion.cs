using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.CompareResults;

namespace RasbetServer.Models.Bets.Odds;

public class Promotion : ICopyFrom<Promotion>, IComparable<Promotion, EventCompareResults>
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)] public string? Id { get; set; } = null;

    [Required] public float Value { get; set; }

    public Promotion() {}
    
    public Promotion(string id, float value)
    {
        Id = id;
        Value = value;
    }
    
    public Promotion(float value)
    {
        Value = value;
    }

    public static Promotion? FromJson(JObject? json)
        => json is null ? 
            null : new Promotion(json[nameof(Value)].Value<float>());

    public void CopyFrom(Promotion other)
    {
        Value = other.Value;
    }

    public EventCompareResults Compare(Promotion? other)
    {
        if (other is null)
            return EventCompareResults.PromotionEnded;

        if (Math.Abs(Value - other.Value) >= 0.01)
            return EventCompareResults.PromotionValueChanged;
        
        return EventCompareResults.NothingChanged;
    }
}