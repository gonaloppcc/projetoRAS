using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets;

public class MultiBet : Bet {
    [Required] 
    public virtual List<OddBetIds> Odds { get; set; }

    public MultiBet() : base() { }
    
    public MultiBet(
        DateTime date,
        bool closed,
        string betterId,
        float amount,
        IEnumerable<OddBetIds> odds
    ) : base(date, closed, betterId, amount) {
        Odds = odds.ToList();
    }

    public override float CalcCashOut()
    {
        float multiplier = 1;
        foreach (var odd in Odds)
            multiplier *= odd.Odd.Price;

        return Amount * multiplier;
    }

    public new static MultiBet FromJson(JObject json)
    {
        DateTime date = json[nameof(Date)].Value<DateTime>();
        string betterId = json[nameof(BetterId)].Value<string>();
        float amount = json[nameof(Amount)].Value<float>();
        List<OddBetIds> eventIds = new();
        
        foreach (var eventId in json[nameof(Odds)].Value<JArray>())
            eventIds.Add(OddBetIds.FromJson(eventId.ToObject<JObject>()));

        return new MultiBet(date, false, betterId, amount, eventIds);
    }
}