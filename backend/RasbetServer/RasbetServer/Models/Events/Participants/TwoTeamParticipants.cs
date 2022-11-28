using System.Text.Json;

namespace RasbetServer.Models.Events.Participants;

public class TwoTeamParticipants : IParticipants
{
    public ulong HomeId { get; }
    public ulong AwayId { get; }
    
    public TwoTeamParticipants(ulong home, ulong away)
    {
        HomeId = home;
        AwayId = away;
    }

    public List<ulong> GetParticipants()
        => new() { HomeId, AwayId };

    public static TwoTeamParticipants FromJson(JsonElement json)
    {
        var home = json.GetProperty("HomeId").GetUInt64();
        var away = json.GetProperty("AwayId").GetUInt64();
        
        return new TwoTeamParticipants(home, away);
    }
}