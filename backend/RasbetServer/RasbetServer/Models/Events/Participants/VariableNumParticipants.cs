using System.Text.Json;
using JsonException = Newtonsoft.Json.JsonException;

namespace RasbetServer.Models.Events.Participants;

public class VariableNumParticipants : IParticipants
{
    public static VariableNumParticipants FromJson(JsonElement json)
    {
        var participants = json.GetProperty("Participants").EnumerateArray().Select(element => element.GetUInt64()).ToList();

        return new VariableNumParticipants(participants);
    }
    
    public List<ulong> Participants { get; }

    public VariableNumParticipants(IEnumerable<ulong> participants)
    {
        Participants = participants.ToList();
    }
    
    public List<ulong> GetParticipants()
    {
        return Participants;
    }
}