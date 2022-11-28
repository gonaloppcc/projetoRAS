using Newtonsoft.Json;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Sports;

namespace RasbetServer.Models.Events;

public abstract class Event
{
    public ulong? Id { get; set; }
    public IParticipants Participants { get; set; }
    public DateTime Date { get; set; }
    
    public ulong CompetitionId { get; set; }
    public ulong SpecialistId { get; set; }
    
    protected Event(
        ulong? id,
        IParticipants participants, 
        DateTime date,
        ulong competitionId,
        ulong specialistId
        )
    {
        Id = id;
        Participants = participants;
        Date = date;
        CompetitionId = competitionId;
        SpecialistId = specialistId;
    }

    public abstract string ToJson(JsonSerializerSettings settings);
    public abstract Sport GetSport();
}