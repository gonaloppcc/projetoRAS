using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets.Odds;

public class Odd : ICopyFrom<Odd>
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)] public string? Id { get; set; } = null;
    [Required] public float Price { get; set; }
    public virtual Promotion? Promo { get; set; }
    
    public virtual IEnumerable<Bet> Bets { get; set; }
    
    [NotMapped]
    public virtual Event Event { get; }

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

    public Odd(string id)
    {
        Id = id;
    }

    // FIXME: Make event attribute of this class
    public virtual bool HasWon(Event @event)
    {
        return false;
    }

    public virtual string GetName()
    {
        return "Odd";
    }

    public virtual void CopyFrom(Odd other)
    {
        Price = other.Price;
        if (other.Promo is not null && Promo is not null)
            Promo.CopyFrom(other.Promo);
    }
}