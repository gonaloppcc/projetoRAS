using RasbetServer.Resources.Odds;

namespace RasbetServer.Resources.Bets.SimpleBet;

public class SimpleBetResource : BetResource
{
    public string EventId { get; set; }
    public OddResource Odd { get; set; }

    public override string Type => "SimpleBet";
}