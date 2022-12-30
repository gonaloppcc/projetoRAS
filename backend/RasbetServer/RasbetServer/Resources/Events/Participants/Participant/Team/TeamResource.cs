namespace RasbetServer.Resources.Events.Participants.Participant.Team;

public class TeamResource : ParticipantResource
{
    public IEnumerable<string> Players { get; set; }
}