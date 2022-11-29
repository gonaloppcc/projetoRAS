using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Bets;

public class SimpleBet : Bet
{
    public Odd Target { get; private set; }
    public float Amount { get; }
 
    public SimpleBet(
        ulong? id,
        DateTime date,
        bool closed,
        float amount
    ) : base(id, date, closed)
    {
        Amount = amount;
    }

    public override float CalcCashOut()
    {
        throw new NotImplementedException();
    }
}