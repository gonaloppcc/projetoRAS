using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets;

public class OddBetIds
{
    [ForeignKey("OddId")]
    public string OddId { get; set; }
    public virtual Odd Odd { get; set; }
    
    [Required]
    [ForeignKey("EventId")]
    public string EventId { get; set; }
    public virtual Event Event { get; set; }
    
    [ForeignKey("BetId")] public string? MultiBetId { get; set; } = null;

    public static OddBetIds FromJson(JObject json)
    {
        string oddId = json[nameof(OddId)].Value<string>();
        string eventId = json[nameof(EventId)].Value<string>();

        return new OddBetIds { OddId = oddId, EventId = eventId };
    }
}