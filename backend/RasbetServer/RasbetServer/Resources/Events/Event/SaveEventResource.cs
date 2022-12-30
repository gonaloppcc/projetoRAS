using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Events.Event;

public abstract class SaveEventResource
{
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public string CompetitionId { get; set; }
    [Required]
    public bool Completed { get; set; }
}