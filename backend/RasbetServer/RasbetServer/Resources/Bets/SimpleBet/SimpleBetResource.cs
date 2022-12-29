namespace RasbetServer.Resources.Bets.SimpleBet;

public class SimpleBetResource : BetResource
{
    public string OddId { get; set; }

    public override string Type => "SimpleBet";
}