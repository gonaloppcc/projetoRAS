using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Events.Event.Participants.Participant;

public abstract class SaveParticipantResource
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string SportId { get; set; }
}