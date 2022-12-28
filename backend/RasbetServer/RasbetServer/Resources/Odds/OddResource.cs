using RasbetServer.Resources.Promotions;

namespace RasbetServer.Resources.Odds;

public class OddResource
{
    public string Id { get; set; }
    public float Price { get; set; }
    public PromotionResource? Promotion { get; set; }
}