using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Bets;

public abstract class Bet
{
    public ulong? Id { get; }
    public DateTime Date { get; }
    public bool Closed { get; }
    public Odd Target { get; }
    public float Amount { get; }
    
    public Bet(
        ulong? id,
        DateTime date,
        bool closed,
        Odd odd,
        float amount
    )
    {
        Id = id;
        Date = date;
        Closed = closed;
        Target = odd;
        Amount = amount;
    }

    public float CalcCashOut()
        => Amount * Target.Price;
}