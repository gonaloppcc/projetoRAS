using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Events.Event.Participants.Participant.Player;

public class SavePlayerResource : SaveParticipantResource
{
    [Required]
    public string TeamId { get; set; }
}