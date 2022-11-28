using System.Text.Json;
using Newtonsoft.Json;
using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Events.Sports.Football;

public class FootballEvent : Event
{
    public static Sport SportType => Sport.Football;

    public FootballEvent(
        ulong? id,
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

    public FootballEvent(
        ulong? id,
        TwoTeamParticipants participants,
        DateTime date,
        ulong competitionId,
        ulong specialistId
        ) : base(id, participants, date, competitionId, specialistId)
    { }
    
    public static FootballEvent FromJson(JsonElement json)
    {
        var participants = TwoTeamParticipants.FromJson(json.GetProperty("Participants"));
        var date = json.GetProperty("Date").GetDateTime(); 
        ulong competitionId = json.GetProperty("CompetitionId").GetUInt64();
        ulong specialistId = json.GetProperty("SpecialistId").GetUInt64();
        
        return new FootballEvent(null, participants, date, competitionId, specialistId);
    }

    public override string ToJson(JsonSerializerSettings settings)
    {
        return JsonConvert.SerializeObject(this, settings);
    }

    public override Sport GetSport()
        => SportType;
}