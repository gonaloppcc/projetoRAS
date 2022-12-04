using RasbetServer.Models.Bets;

namespace RasbetServer.Repositories.BetRepository;

public interface IBetRepository
{
    Bet MakeBet(Bet bet);
    Bet GetBet(string id);
    IEnumerable<Bet> GetBets(string userId);
}