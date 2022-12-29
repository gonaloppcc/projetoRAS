using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Events.Competitions;

public class SaveCompetitionResource
{
    [Required]
    [MaxLength(40)]
    public string Name { get; set; }

    [Required]
    public string SportId { get; set; }
}