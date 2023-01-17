using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;
using RasbetServer.Resources.Odds;

namespace RasbetServer.Resources.Bets.MultiBet;

public class OddEventResource
{
    public string EventId { get; set; }
    public OddResource Odd { get; set; }

    public OddEventResource(Event e, Odd o)
    {
        EventId = e.Id;
        Odd = OddResource.FromOdd(o);
    }
}