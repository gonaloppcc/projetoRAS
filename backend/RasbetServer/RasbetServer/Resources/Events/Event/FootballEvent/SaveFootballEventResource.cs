using System.ComponentModel.DataAnnotations;
using RasbetServer.Resources.Events.Event.BaseParticipants.TwoParticipants;

namespace RasbetServer.Resources.Events.Event.FootballEvent;

public class SaveFootballEventResource : SaveEventResource
{
    [Required]
    public SaveTwoParticipantsResource Participants { get; set; }
}