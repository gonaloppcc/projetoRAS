using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets;

public class SimpleBet : Bet {
    
    [Required]
    [ForeignKey("OddId")]
    public string OddId { get; set; }
    public virtual Odd Odd { get; set; }
    
    [Required]
    [ForeignKey("EventId")]
    public string EventId { get; set; }
    public virtual Event Event { get; set; }

    public SimpleBet() : base() { }
    
    public SimpleBet(
        DateTime date,
        bool closed,
        string oddId,
        string betterId,
        string eventId,
        float amount
    ) : base(date, closed, betterId, amount)
    {
        EventId = eventId;
        OddId = oddId;
    }

    public new static SimpleBet FromJson(JObject json)
    {
        DateTime date = json[nameof(Date)].Value<DateTime>();
        string oddId = json[nameof(OddId)].Value<string>();
        string betterId = json[nameof(BetterId)].Value<string>();
        string eventId = json[nameof(EventId)].Value<string>();
        float amount = json[nameof(Amount)].Value<float>();

        return new SimpleBet(date, false, oddId, betterId, eventId, amount);
    }

    public override float CalcCashOut()
        => Amount * Odd.Price;
}