using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Events;

public class FootballEvent : Event {
    public FootballEvent(
        ulong? id,
        TwoParticipants participants,
        DateTime date,
        string competition,
        bool completed
    ) : base(id, participants, date, competition, completed) {
    }
}