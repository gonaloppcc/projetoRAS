using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Events;

public abstract class Event {
    [Key] public ulong? Id { get; }
    [Required] public IParticipants Participants { get; }
    [Required] public DateTime Date { get; }

    [Required]
    [ForeignKey("CompetitionId")]
    public string Competition { get; }

    [Required] public bool Completed { get; set; }

    public Event(
        ulong? id,
        IParticipants participants,
        DateTime date,
        string competition,
        bool completed
    ) {
        Id = id;
        Participants = participants;
        Date = date;
        Competition = competition;
        Completed = completed;
    }
}