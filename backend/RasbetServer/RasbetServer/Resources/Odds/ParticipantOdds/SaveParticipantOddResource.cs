using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Odds.ParticipantOdds;

public class SaveParticipantOddResource : SaveOddResource
{
    [Required]
    public string PartId { get; set; }
}