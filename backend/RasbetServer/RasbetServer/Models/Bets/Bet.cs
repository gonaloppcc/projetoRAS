namespace RasbetServer.Models.Bets;

public abstract class Bet
{
    public ulong? Id { get; }
    public DateTime Date { get; }
    public bool Closed { get; }
    
    public Bet(
        ulong? id,
        DateTime date,
        bool closed
    )
    {
        Id = id;
        Date = date;
        Closed = closed;
    }

    public abstract float CalcCashOut();
}