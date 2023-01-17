using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Resources.Odds.TieOdds;

public class TieOddResource : OddResource
{
    public override string Type => "Tie";

    public TieOddResource(TieOdd odd) : base(odd)
    { }
}