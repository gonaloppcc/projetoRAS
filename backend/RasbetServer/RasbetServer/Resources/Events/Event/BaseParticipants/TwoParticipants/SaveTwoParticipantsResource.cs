using System.ComponentModel.DataAnnotations;
using RasbetServer.Resources.Events.Event.BaseParticipants.Result;
using RasbetServer.Resources.Odds.TieOdd;

namespace RasbetServer.Resources.Events.Event.BaseParticipants.TwoParticipants;

public class SaveTwoParticipantsResource : SaveBaseParticipantsResource
{
    [Required]
    public SaveResultResource Home { get; set; }
    [Required]
    public SaveResultResource Away { get; set; }
    public SaveTieOddResource? Tie { get; set; }
}