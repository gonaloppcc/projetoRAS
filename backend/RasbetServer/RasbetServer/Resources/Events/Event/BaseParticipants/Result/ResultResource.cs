using RasbetServer.Resources.Odds.ParticipantOdds;

namespace RasbetServer.Resources.Events.Event.BaseParticipants.Result;

public class ResultResource
{
    public ParticipantOddResource Participant { get; set; }
    public int? Score { get; set; }
}