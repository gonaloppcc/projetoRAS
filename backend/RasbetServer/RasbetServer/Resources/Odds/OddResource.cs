using RasbetServer.Models.Bets.Odds;
using RasbetServer.Resources.Odds.ParticipantOdds;
using RasbetServer.Resources.Odds.TieOdds;
using RasbetServer.Resources.Promotions;

namespace RasbetServer.Resources.Odds;

public abstract class OddResource
{
    public virtual string Type { get; }
    
    public string Id { get; set; }
    public float Price { get; set; }
    public PromotionResource? Promo { get; set; }

    protected OddResource(Odd odd)
    {
        Id = odd.Id;
        Price = odd.Price;
        
        if (odd.Promo is not null)
            Promo = new PromotionResource(odd.Promo);
    }

    public static OddResource FromOdd(Odd o)
    {
        return o switch
        {
            TieOdd t => new TieOddResource(t),
            ParticipantOdd p => new ParticipantOddResource(p),
            _ => throw new ArgumentOutOfRangeException(nameof(o), o, null)
        };
    }
}