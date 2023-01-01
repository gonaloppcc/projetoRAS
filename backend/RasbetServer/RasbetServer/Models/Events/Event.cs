using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Resources.Events.Event;
using RasbetServer.Resources.Events.Event.FootballEvent;

namespace RasbetServer.Models.Events;

public abstract class Event : ICopyFrom<Event>, IComparable<Event>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;

    [Required]
    [ForeignKey("ParticipantsId")]
    public string? ParticipantsId { get; set; } = null;
    public virtual BaseParticipants Participants { get; set; }

    public virtual IEnumerable<Odd> Odds { get; }

    [Required] public DateTime Date { get; set; }

    [Required]
    [ForeignKey("CompetitionId")]
    public string CompetitionId { get; set; }
    public virtual Competition Competition { get; set; }
    
    [Required] public bool Completed { get; set; }

    public Event() { }
    
    public Event(
        string id,
        BaseParticipants participants,
        DateTime date,
        string competitionId,
        bool completed
    )
    {
        Id = id;
        Participants = participants;
        Date = date;
        CompetitionId = competitionId;
        Completed = completed;
    }
    
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

    private static string? GetSportFromJObject(JObject json)
        => (json["Sport"] ?? json["sport"])?.Value<string>();

    private static JToken? GetEventTokenFromJObject(JObject json)
        => json["Event"] ?? json["event"];

    public static SaveEventResource? FromJson(JObject json)
    {
        return GetSportFromJObject(json) switch
        {
            FootballEvent.Sport => GetEventTokenFromJObject(json)?.ToObject<SaveFootballEventResource>(),
            _ => throw new JsonException()
        };
    }

    public virtual void CopyFrom(Event other)
    {
        Date = other.Date;
        Completed = other.Completed;
        Participants.CopyFrom(other.Participants);
    }

    public virtual bool Compare(Event other)
    {
        return Math.Truncate((Date - other.Date).TotalMinutes) == 0 &&
               Completed == other.Completed &&
               CompetitionId == other.CompetitionId &&
               Participants.Compare(other.Participants);

    }
}