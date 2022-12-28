using RasbetServer.Resources.Events.Event.Participants.Participant.Player;

namespace RasbetServer.Resources.Events.Event.Participants.Participant.Team;

public class TeamResource : ParticipantResource
{
    public IEnumerable<string> Players { get; set; }
}