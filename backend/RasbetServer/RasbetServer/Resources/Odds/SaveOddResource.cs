using System.ComponentModel.DataAnnotations;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Resources.Odds;

public class SaveOddResource
{
    [Required]
    public float Price { get; set; }
    public Promotion? Promo { get; set; }
}