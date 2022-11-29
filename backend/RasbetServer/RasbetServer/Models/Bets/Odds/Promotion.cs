namespace RasbetServer.Models.Bets.Odds;

public class Promotion
{
    public Promotion(float value)
    {
        Value = value;
    }

    public float Value { get; set; }
}