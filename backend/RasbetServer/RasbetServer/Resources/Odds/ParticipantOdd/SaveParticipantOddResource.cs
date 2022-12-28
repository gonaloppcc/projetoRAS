using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Odds.ParticipantOdd;

public class SaveParticipantOddResource : SaveOddResource
{
    [Required]
    public string PartId { get; set; }
}