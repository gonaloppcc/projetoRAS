using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public interface IParticipants
{
    List<KeyValuePair<ParticipantOdd, int>> GetParticipants();
    KeyValuePair<ParticipantOdd, int>? GetWinner();
}