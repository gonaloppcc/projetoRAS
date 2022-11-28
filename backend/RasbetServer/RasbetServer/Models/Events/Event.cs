using Newtonsoft.Json;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Sports;

namespace RasbetServer.Models.Events;

public abstract class Event
{
    protected Event(IParticipants participants, Competition comp, DateTime date)
    {
        Participants = participants;
        Comp = comp;
        Date = date;
    }

    public IParticipants Participants { get; set; }
    public Competition Comp { get; set; }
    public DateTime Date { get; set; }

    public abstract string ToJson(JsonSerializerSettings settings);
    public abstract Sport GetSport();
}