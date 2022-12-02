using RasbetServer.Models.Events;

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

    // FIXME: Make event attribute of this class
    public abstract bool HasWon(Event @event);
    public abstract string GetName();
}