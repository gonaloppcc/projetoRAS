namespace RasbetServer.Resources.Bets.MultiBet;

public class SaveMultiBetResource : SaveBetResource
{
    public IEnumerable<string> OddIds { get; set; }
}