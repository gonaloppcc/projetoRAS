namespace RasbetServer.Resources.Bets;

public abstract class BetResource
{
    public string Id { get; set; }
    public DateTime Date { get; set; }
    public bool Closed { get; set; }
    public float Amount { get; set; }
    public string BetterId { get; set; }
    
    public virtual string Type { get; }
}