using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Bets.Odds;

public class Promotion
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)] public string? Id { get; set; } = null;

    [Required] public float Value { get; set; }

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
}