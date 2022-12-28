using RasbetServer.Models.Bets;

namespace RasbetServer.Repositories.BetRepository;

public interface IBetRepository
{
    Task<Bet> AddAsync(Bet bet);
    Task<Bet> GetAsync(string id);
    Task<IEnumerable<Bet>> ListAsync(string userId);
    Task DeleteAsync(string id);
}