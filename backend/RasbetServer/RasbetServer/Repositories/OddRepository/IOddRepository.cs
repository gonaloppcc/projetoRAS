using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Repositories.OddRepository;

public interface IOddRepository
{
    Task<Odd?> GetAsync(string id);
    Task UpdateAsync(Odd o);
}