using System.Text.Json;
using Newtonsoft.Json;
using RasbetServer.Models.Events.Participants;
using JsonException = Newtonsoft.Json.JsonException;

namespace RasbetServer.Models.Events.Sports.Basketball;

public class BasketballEvent : Event
{
    public static Sport SportType => Sport.Basketball;

    public BasketballEvent(
        ulong id,
        ulong homeTeam,
        ulong awayTeam,
        DateTime date,
        ulong competitionId,
        ulong specialistId
    ) : base(
        id,
        new TwoTeamParticipants(homeTeam, awayTeam), 
        date,
        competitionId,
        specialistId
        )
    { }

    public BasketballEvent(
        ulong? id,
        TwoTeamParticipants participants,
        DateTime date,
        ulong competitionId,
        ulong specialistId
    ) : base(id, participants, date, competitionId, specialistId)
    { }

    public override string ToJson(JsonSerializerSettings settings)
    {
        return JsonConvert.SerializeObject(this, settings);
    }

    public static BasketballEvent FromJson(JsonElement json)
    {
        var participants = TwoTeamParticipants.FromJson(json.GetProperty("Participants"));
        var date = json.GetProperty("Date").GetDateTime();
        ulong competitionId = json.GetProperty("CompetitionId").GetUInt64();
        ulong specialistId = json.GetProperty("SpecialistId").GetUInt64();
        
        return new BasketballEvent(null, participants, date, competitionId, specialistId);
    }

    public override Sport GetSport()
    {
        return SportType;
    }
}