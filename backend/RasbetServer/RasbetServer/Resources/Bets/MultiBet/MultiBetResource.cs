namespace RasbetServer.Resources.Bets.MultiBet;

public class MultiBetResource : BetResource
{
    public IEnumerable<OddEventResource> Odds { get; set; }

    public override string Type => "MultiBet";
}