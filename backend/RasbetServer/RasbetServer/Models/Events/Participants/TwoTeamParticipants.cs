using System.Text.Json;

namespace RasbetServer.Models.Events.Football;

public class TwoTeamParticipants : IParticipants
{
    public string Home { get; }
    public string Away { get; }
    
    public TwoTeamParticipants(string home, string away)
    {
        Home = home;
        Away = away;
    }

    public List<string> GetParticipants()
        => new() { Home, Away };

    public static TwoTeamParticipants FromJson(JsonElement json)
    {
        var home = json.GetProperty("Home").GetString();
        var away = json.GetProperty("Away").GetString();
        if (home is null || away is null)
        {
            throw new JsonException();
        }
        
        return new TwoTeamParticipants(home, away);
    }
}