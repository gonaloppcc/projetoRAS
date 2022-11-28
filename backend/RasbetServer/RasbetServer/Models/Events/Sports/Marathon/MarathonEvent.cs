using System.Text.Json;
using Newtonsoft.Json;
using RasbetServer.Models.Events.Participants;
using JsonException = Newtonsoft.Json.JsonException;

namespace RasbetServer.Models.Events.Sports.Marathon;

public class MarathonEvent : Event
{
    public static Sport SportType => Sport.Marathon;

    public static MarathonEvent FromJson(JsonElement json)
    {
        var participants = VariableNumParticipants.FromJson(json.GetProperty("Participants"));
        var date = json.GetProperty("Date").GetDateTime();
        ulong competitionId = json.GetProperty("CompetitionId").GetUInt64();
        ulong specialistId = json.GetProperty("SpecialistId").GetUInt64();

        return new MarathonEvent(null, participants, date, competitionId, specialistId);
    }
    
    public MarathonEvent(
        ulong? id,
        IEnumerable<ulong> participants,
        DateTime date,
        ulong competitionId,
        ulong specialistId
        )
        : base(
            id,
            new VariableNumParticipants(participants),
            date,
            competitionId,
            specialistId
        )
    { }
    
    public MarathonEvent(
        ulong? id,
        VariableNumParticipants participants,
        DateTime date,
        ulong competitionId,
        ulong specialistId
        ) 
        : base(id, participants, date, competitionId, specialistId)
    { }

    public override string ToJson(JsonSerializerSettings settings)
        => JsonConvert.SerializeObject(this, settings);

    public override Sport GetSport()
        => SportType;
}