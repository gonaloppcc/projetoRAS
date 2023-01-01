using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Events;

public class FootballEvent : Event
{
    public const string Sport = "Football";

    public override IEnumerable<Odd> Odds
    {
        get
        {
            if (Participants is not TwoParticipants twoParticipants)
                return new List<Odd>();
            
            var odds =  new List<Odd> { twoParticipants.Home.Participant, twoParticipants.Away.Participant };
            if (twoParticipants.Tie is not null)
                odds.Add(twoParticipants.Tie);

            return odds;
        }
    }

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