using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Bets;

public class MultiBet : Bet
{
    public List<KeyValuePair<Odd, float>> TargetOdds { get; }
 
    public MultiBet(
        ulong? id,
        DateTime date,
        bool closed,
        List<KeyValuePair<Odd, float>> odds)
        : base(id, date, closed)
    {
        TargetOdds = odds;
    }

    public override float CalcCashOut()
    {
        throw new NotImplementedException();
    }
}