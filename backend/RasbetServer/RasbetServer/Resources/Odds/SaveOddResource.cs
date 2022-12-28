using System.ComponentModel.DataAnnotations;
using RasbetServer.Resources.Promotions;

namespace RasbetServer.Resources.Odds;

public class SaveOddResource
{
    [Required]
    public float Price { get; set; }
    public SavePromotionResource? Promo { get; set; }
}