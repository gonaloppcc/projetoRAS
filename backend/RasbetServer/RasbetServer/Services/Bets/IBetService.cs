using RasbetServer.Models.Bets;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Bets;

public interface IBetService
{
    Task<ObjectResponse<Bet>> GetAsync(string id);
    Task<ObjectResponse<IEnumerable<Bet>>> ListAsync(string userId);
    Task<ObjectResponse<Bet>> AddAsync(Bet bet);
    Task<ObjectResponse<float>> CancelBetAsync(string id);
}