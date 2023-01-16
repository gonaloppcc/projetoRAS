using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets;

public class SimpleBet : Bet {
    [NotMapped]
    public virtual Odd Odd
    {
        get => Odds[0];
        set => Odds.Insert(0, value);
    }

    public SimpleBet() : base() { }
    
    public override float CalcCashOut()
        => Amount * Odd.Price;
}