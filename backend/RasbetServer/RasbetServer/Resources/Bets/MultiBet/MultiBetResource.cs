namespace RasbetServer.Resources.Bets.MultiBet;

public class MultiBetResource : BetResource
{
    public IEnumerable<string> OddIds { get; set; }

    public override string Type => "MultiBet";
}