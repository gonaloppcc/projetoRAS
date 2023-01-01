using System.ComponentModel.DataAnnotations;
using RasbetServer.Resources.Odds.ParticipantOdd;

namespace RasbetServer.Resources.Events.Event.BaseParticipants.Result;

public class SaveResultResource
{
    [Required]
    public SaveParticipantOddResource Participant { get; set; }
    public int? Score { get; set; }
}