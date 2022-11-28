using System.Text.Json;
using JsonException = Newtonsoft.Json.JsonException;

namespace RasbetServer.Models.Events.Participants;

public class VariableNumParticipants : IParticipants
{
    public static VariableNumParticipants FromJson(JsonElement json)
    {
        List<string> participants = new();
        foreach (var participant in json.GetProperty("Participants").EnumerateArray().Select(element => element.GetString()))
        {
            if (participant is null)
                throw new JsonException();
            
            participants.Add(participant);
        }

        return new VariableNumParticipants(participants);
    }
    
    public List<string> Participants { get; }

    public VariableNumParticipants(IEnumerable<string> participants)
    {
        Participants = participants.ToList();
    }
    
    public List<string> GetParticipants()
    {
        return Participants;
    }
}