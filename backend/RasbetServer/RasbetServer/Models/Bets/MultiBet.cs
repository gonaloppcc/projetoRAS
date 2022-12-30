using System.ComponentModel.DataAnnotations;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Bets;

public class MultiBet : Bet {
    [Required]
    //public IList<string> OddIds { get; set; }
    public virtual IList<Odd> Odds { get; set; }

    public MultiBet() : base() { }
    
    public MultiBet(
        DateTime date,
        bool closed,
        string betterId,
        float amount,
        IEnumerable<Odd> odds
        ) : base(date, closed, betterId, amount) {
        Odds = odds.ToList();
    }

    public override float CalcCashOut()
    {
        float multiplier = 1;
        foreach (var odd in Odds)
            multiplier *= odd.Price;

        return Amount * multiplier;
    }

    public override IEnumerable<Odd> GetOdds() => Odds;
}