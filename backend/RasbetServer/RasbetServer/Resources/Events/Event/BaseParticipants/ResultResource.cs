using RasbetServer.Resources.Odds.ParticipantOdd;

namespace RasbetServer.Resources.Events.Event.BaseParticipants;

public class ResultResource
{
    public ParticipantOddResource Participant { get; set; }
    public int? Score { get; set; }
}