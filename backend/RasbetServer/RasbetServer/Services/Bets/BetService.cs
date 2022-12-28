using RasbetServer.Exceptions.Users;
using RasbetServer.Models.Bets;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.UserRepository;

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
    
    public async Task<Bet> GetAsync(string id)
    {
        return await _betRepository.GetAsync(id);
    }

    public async Task<IEnumerable<Bet>> ListAsync(string userId)
    {
        return await _betRepository.ListAsync(userId);
    }

    public async Task<Bet> AddAsync(Bet bet)
    {
        var user = await _userRepository.GetAsync(bet.BetterId);
        if (user is not Better better)
            throw new InvalidUserTypeException("User must be a better to make bets");
        if (better.Balance < bet.Amount)
            throw new InvalidOperationException("Not enough balance to make this bet");
        
        bet.Date = DateTime.Now;
        bet.Closed = false;
        var added = await _betRepository.AddAsync(bet);
        better.Balance -= bet.Amount;
        better.TransactionHist.Add(new Transaction(-bet.Amount));
        //await _userRepository.AddTransactionAsync(new Transaction(-bet.Amount));
        await _userRepository.UpdateAsync(better);

        return added;
    }

    public async Task<float> CancelBetAsync(string id)
    {
        var bet = await _betRepository.GetAsync(id);
        if (bet.Closed)
            throw new InvalidOperationException("Bet is closed");
        
        var user = await _userRepository.GetAsync(bet.BetterId);
        if (user is not Better better)
            throw new InvalidUserTypeException("User must be a better");

        float cancelReturn = bet.CancelReturn;
        better.Balance += cancelReturn;
        await _betRepository.DeleteAsync(id);
        better.TransactionHist.Add(new Transaction(cancelReturn));
        await _userRepository.UpdateAsync(better);

        return better.Balance;
    }
}