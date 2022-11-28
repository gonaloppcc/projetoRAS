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
        if (!Enum.TryParse(json.GetProperty("Competition").GetString(), out Competition comp))
            throw new JsonException();

        return new MarathonEvent(participants, comp, date);
    }
    
    public MarathonEvent(IEnumerable<string> participants, Competition comp, DateTime date)
        : base(
            new VariableNumParticipants(participants),
            comp,
            date
        )
    { }
    
    public MarathonEvent(VariableNumParticipants participants, Competition comp, DateTime date) 
        : base(participants, comp, date)
    { }

    public override string ToJson(JsonSerializerSettings settings)
        => JsonConvert.SerializeObject(this, settings);

    public override Sport GetSport()
        => SportType;
}