using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets.Odds;

public abstract class Odd
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)] public string? Id { get; set; } = null;
    [Required] public float Price { get; set; }
    public Promotion? Promo { get; set; }

    public Odd() { }
    
    public Odd(string id, float price, Promotion? promo)
    {
        Id = id;
        Price = price;
        Promo = promo;
    }
    
    public Odd(float price, Promotion? promo) {
        Price = price;
        Promo = promo;
    }

    public abstract bool HasWon(Event @event);
    public abstract string GetName();
}