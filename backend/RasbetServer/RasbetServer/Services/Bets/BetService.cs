using RasbetServer.Models.Bets;
using RasbetServer.Models.Users.Better;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Bets;

public class BetService : IBetService
{
    private readonly IBetRepository _betRepository;
    private readonly IUserRepository _userRepository;

    public BetService(IBetRepository betRepository, IUserRepository userRepository)
    {
        _betRepository = betRepository;
        _userRepository = userRepository;
    }
    
    public async Task<ObjectResponse<Bet>> GetAsync(string id)
    {
        var bet = await _betRepository.GetAsync(id);
        if (bet is null)
            return new ObjectResponse<Bet>("Bet not found", StatusCode.NotFound);
        
        return new ObjectResponse<Bet>(bet);
    }

    public async Task<ObjectResponse<IEnumerable<Bet>>> ListAsync(string userId)
    {
        var user = await _userRepository.GetAsync(userId);
        if (user is null)
            return new ObjectResponse<IEnumerable<Bet>>("User not found", StatusCode.NotFound);
        if (user is not Better)
            return new ObjectResponse<IEnumerable<Bet>>("User is not a better", StatusCode.Unauthorized);
        
        return new ObjectResponse<IEnumerable<Bet>>(await _betRepository.ListAsync(userId));
    }

    public async Task<ObjectResponse<Bet>> AddAsync(Bet bet)
    {
        var user = await _userRepository.GetAsync(bet.BetterId);
        if (user is not Better better)
            return new ObjectResponse<Bet>("User is not a better", StatusCode.Unauthorized);
        if (better.Balance < bet.Amount)
            return new ObjectResponse<Bet>("Insufficient balance", StatusCode.Unauthorized);
        
        bet.Date = DateTime.Now;
        bet.Closed = false;
        var added = await _betRepository.AddAsync(bet);
        if (added is null)
            return new ObjectResponse<Bet>("Unknown error registering bet", StatusCode.BadRequest);
        
        better.Balance -= bet.Amount;
        better.TransactionHist.Add(new Transaction(TransactionTypes.BetMade, DateTime.Now, -bet.Amount, better.Balance));
        await _userRepository.UpdateAsync(better);

        return new ObjectResponse<Bet>(added);
    }

    public async Task<ObjectResponse<float>> CancelBetAsync(string id)
    {
        var bet = await _betRepository.GetAsync(id);
        if (bet is null)
            return new ObjectResponse<float>("Bet not found", StatusCode.NotFound);
        if (bet.Closed)
            return new ObjectResponse<float>("Cannot cancel a closed bet", StatusCode.Forbidden);
        
        var user = await _userRepository.GetAsync(bet.BetterId);
        if (user is null)
            return new ObjectResponse<float>("User not found", StatusCode.NotFound);
        if (user is not Better better)
            return new ObjectResponse<float>("User is not a better", StatusCode.Unauthorized);

        float cancelReturn = bet.CancelReturn;
        better.Balance += cancelReturn;
        var deleted = await _betRepository.DeleteAsync(bet);
        if (!deleted)
            return new ObjectResponse<float>("Unknown error canceling bet", StatusCode.BadRequest);
        
        better.TransactionHist.Add(new Transaction(TransactionTypes.BetCancelled, DateTime.Now, cancelReturn, better.Balance));
        await _userRepository.UpdateAsync(better);

        return new ObjectResponse<float>(better.Balance);
    }
}