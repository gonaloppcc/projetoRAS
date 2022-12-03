using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Events;

public abstract class Event
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)] public string? Id { get; set; } = null;

    [Required] [ForeignKey("ParticipantId")] public string? ParticipantsId { get; set; } = null;
    public BaseParticipants Participants { get; set; }
    [Required] public DateTime Date { get; set; }

    [Required] [ForeignKey("CompetitionId")] public string CompetitionId { get; set; }
    public Competition Competition { get; set; }
    
    [Required] public bool Completed { get; set; }

    public Event() { }
    
    public Event(
        BaseParticipants participants,
        DateTime date,
        string competitionId,
        bool completed
    )
    {
        Participants = participants;
        Date = date;
        CompetitionId = competitionId;
        Completed = completed;
    }
}