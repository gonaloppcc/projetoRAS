using RasbetServer.Resources.Odds.TieOdd;

namespace RasbetServer.Resources.Events.Event.BaseParticipants;

public class TwoParticipantsResource : BaseParticipantsResource
{
    public ResultResource Home { get; set; }
    public ResultResource Away { get; set; }
    public TieOddResource? Tie { get; set; }
}