using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Events.Event;

public abstract class SaveEventResource<T>
{
    [Required]
    public T Participants { get; set; }
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public string CompetitionId { get; set; }
    [Required]
    public bool Completed { get; set; }
}