using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Events.Event.Participants.Participant.Team;

public class SaveTeamResource : SaveParticipantResource
{
    [Required]
    public IEnumerable<string> Players { get; set; }
}