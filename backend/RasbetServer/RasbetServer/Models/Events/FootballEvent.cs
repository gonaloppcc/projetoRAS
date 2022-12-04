using System.Text.Json.Nodes;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Events;

public class FootballEvent : Event {
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

    public static FootballEvent FromJson(JObject json)
    {
        TwoParticipants participants = TwoParticipants.FromJson(json["Participants"].ToObject<JObject>());
        DateTime date = json["Date"].Value<DateTime>();
        string competitionId = json["CompetitionId"].Value<string>();

        return new FootballEvent(participants, date, competitionId, false);
    }
}