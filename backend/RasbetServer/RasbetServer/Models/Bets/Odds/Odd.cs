using System.ComponentModel.DataAnnotations;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets.Odds;

public abstract class Odd {
    [Key] public ulong? Id { get; }
    [Required] public float Price { get; }
    public Promotion? Promo { get; set; }

    public Odd(ulong? id, float price, Promotion? promo) {
        Id = id;
        Price = price;
        Promo = promo;
    }

    public abstract bool HasWon(Event @event);
    public abstract string GetName();
}