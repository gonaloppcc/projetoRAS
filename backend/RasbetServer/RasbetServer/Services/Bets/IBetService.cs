using RasbetServer.Models.Bets;

namespace RasbetServer.Services.Bets;

public interface IBetService
{
    Task<Bet> GetAsync(string id);
    Task<IEnumerable<Bet>> ListAsync(string userId);
    Task<Bet> AddAsync(Bet bet);
    Task<float> CancelBetAsync(string id);
}