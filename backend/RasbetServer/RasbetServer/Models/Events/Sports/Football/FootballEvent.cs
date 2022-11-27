using System.Text.Json;
using Newtonsoft.Json;
using JsonException = System.Text.Json.JsonException;

namespace RasbetServer.Models.Events.Football;

public class FootballEvent : Event
{
    public static Sport SportType => Sport.Football;

    public FootballEvent(
        string homeTeam,
        string awayTeam,
        Competition comp,
        DateTime date
    ) : base(
        new TwoTeamParticipants(homeTeam, awayTeam),
        comp,
        date
        )
    { }

    public FootballEvent(
        TwoTeamParticipants participants,
        Competition comp,
        DateTime date
    ) : base(participants,comp,date)
    { }
    
    public static FootballEvent FromJson(JsonElement json)
    {
        var participants = TwoTeamParticipants.FromJson(json.GetProperty("Participants"));
        var date = json.GetProperty("Date").GetDateTime();
        Competition comp = (Competition) json.GetProperty("Competition").GetUInt16();
        
        return new FootballEvent(participants, comp, date);
    }

    public override string ToJson(JsonSerializerSettings settings)
    {
        return JsonConvert.SerializeObject(this, settings);
    }

    public override Sport GetSport()
        => SportType;
}