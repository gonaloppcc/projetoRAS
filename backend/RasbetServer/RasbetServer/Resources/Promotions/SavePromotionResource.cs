using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Promotions;

public class SavePromotionResource
{
    [Required]
    public float Value { get; set; }
}