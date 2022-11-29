namespace RasbetServer.Models.Bets.Odds;

public abstract class Odd
{
    public ulong? Id { get; }
    public float Price { get; }
    public Promotion? Promo { get; set; }
    
    public Odd(ulong? id, float price, Promotion? promo)
    {
        Id = id;
        Price = price;
        Promo = promo;
    }

    public abstract bool HasWon();
}