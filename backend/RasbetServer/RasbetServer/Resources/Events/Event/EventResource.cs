using RasbetServer.Resources.Events.Event.BaseParticipants;

namespace RasbetServer.Resources.Events.Event;

public abstract class EventResource
{
    public string Id { get; set; }
    public BaseParticipantsResource Participants { get; set; }
    public DateTime Date { get; set; }
    public string Competition { get; set; }
    public bool Completed { get; set; }
}