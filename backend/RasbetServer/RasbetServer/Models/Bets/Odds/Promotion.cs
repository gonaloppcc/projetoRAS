using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Models.Bets.Odds;

public class Promotion {
    [Required] public float Value { get; set; }

    public Promotion(float value) {
        Value = value;
    }
}