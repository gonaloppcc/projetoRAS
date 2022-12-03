using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Events;

public abstract class Event
{
    public Event(
        ulong? id,
        IParticipants participants,
        DateTime date,
        string competition,
        bool completed
    )
    {
        Id = id;
        Participants = participants;
        Date = date;
        Competition = competition;
        Completed = completed;
    }

    public ulong? Id { get; }
    public IParticipants Participants { get; }
    public DateTime Date { get; }
    public string Competition { get; }
    public bool Completed { get; set; }
}