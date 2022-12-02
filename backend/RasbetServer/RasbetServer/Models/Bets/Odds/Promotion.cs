namespace RasbetServer.Models.Bets.Odds;

public class Promotion
{
    public float Value { get; set; }
 
    public Promotion(float value)
    {
        Value = value;
    }
}