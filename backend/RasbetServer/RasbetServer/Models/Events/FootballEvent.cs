using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Events;

public class FootballEvent : Event
{
    public const string Sport = "Football";

    public FootballEvent() : base() { }
    
    public FootballEvent(
        string id,
        TwoParticipants participants,
        DateTime date,
        string competition,
        bool completed
    ) : base(id, participants, date, competition, completed) {
    }
    
    public FootballEvent(
        TwoParticipants participants,
        DateTime date,
        string competition,
        bool completed
    ) : base(participants, date, competition, completed) {
    }
}