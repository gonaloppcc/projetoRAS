using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public interface IParticipants
{
    List<Result> GetParticipants();
    Result? GetWinner();
}