using RasbetServer.Resources.Events.Participants.Participant;

namespace RasbetServer.Resources.Odds.ParticipantOdd;

public class ParticipantOddResource : OddResource
{
    public ParticipantResource Part { get; set; }
}