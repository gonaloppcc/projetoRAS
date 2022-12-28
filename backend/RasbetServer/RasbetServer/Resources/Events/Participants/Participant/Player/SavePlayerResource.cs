using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Events.Participants.Participant.Player;

public class SavePlayerResource : SaveParticipantResource
{
    [Required]
    public string TeamId { get; set; }
}