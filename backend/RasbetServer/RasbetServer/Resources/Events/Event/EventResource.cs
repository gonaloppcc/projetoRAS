using RasbetServer.Resources.Events.Competitions;
using RasbetServer.Resources.Events.Event.BaseParticipants;

namespace RasbetServer.Resources.Events.Event;

public class EventResource
{
    public string Id { get; set; }
    public BaseParticipantsResource Participants { get; set; }
    public DateTime Date { get; set; }
    public CompetitionResource Competition { get; set; }
    public bool Completed { get; set; }
}