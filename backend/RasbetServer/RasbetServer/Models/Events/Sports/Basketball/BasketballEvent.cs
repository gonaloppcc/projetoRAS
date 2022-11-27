using System.Text.Json;
using Newtonsoft.Json;
using RasbetServer.Models.Events.Football;
using JsonException = Newtonsoft.Json.JsonException;

namespace RasbetServer.Models.Events.Sports.Basketball;

public class BasketballEvent : Event
{
    public static Sport SportType => Sport.Basketball;

    public BasketballEvent(
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

    public BasketballEvent(
        TwoTeamParticipants participants,
        Competition comp,
        DateTime date
    ) : base(participants, comp, date)
    { }

    public override string ToJson(JsonSerializerSettings settings)
    {
        return JsonConvert.SerializeObject(this, settings);
    }

    public static BasketballEvent FromJson(JsonElement json)
    {
        var participants = TwoTeamParticipants.FromJson(json.GetProperty("Participants"));
        var date = json.GetProperty("Date").GetDateTime();

        if (!Enum.TryParse(json.GetProperty("Competition").GetString(), out Competition comp))
            throw new JsonException();

        return new BasketballEvent(participants, comp, date);
    }

    public override Sport GetSport()
    {
        return SportType;
    }
}