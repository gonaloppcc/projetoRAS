using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Resources.Promotions;

public class PromotionResource
{
    public float Value { get; set; }

    public PromotionResource(Promotion p)
    {
        Value = p.Value;
    }
}