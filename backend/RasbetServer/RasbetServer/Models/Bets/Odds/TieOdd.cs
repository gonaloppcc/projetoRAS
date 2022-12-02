namespace RasbetServer.Models.Bets.Odds;

public class TieOdd : Odd
{
    public TieOdd(ulong? id, float price, Promotion promo) : base(id, price, promo)
    {
    }

    public override bool HasWon()
    {
        throw new NotImplementedException();
    }

    public override string GetName()
        => "Tie";
}