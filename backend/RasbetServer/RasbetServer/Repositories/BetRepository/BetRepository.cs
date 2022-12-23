using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Bets;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.BetRepository;

public class BetRepository : BaseRepository, IBetRepository
{
    public BetRepository(AppDbContext context) : base(context)
    {
    }

    public Bet MakeBet(Bet bet)
    {
        var user = (from b in _context.Betters where b.Id == bet.BetterId select b).Single();
        if (user.Balance < bet.Amount)
            throw new InvalidOperationException("Not enough balance");
        
        var newBet = _context.Bets.Add(bet);
        user.Balance -= bet.Amount;
        user.TransactionHist.Add(new Transaction(-bet.Amount));
        _context.SaveChanges();

        // Refresh _context cache
        newBet.State = EntityState.Detached;
        return _context.Bets.Find(newBet.Entity.Id) 
               ?? throw new InvalidOperationException();
    }

    public Bet GetBet(string id)
        => (from b in _context.Bets where b.Id == id select b).Single();

    public IEnumerable<Bet> GetBets(string userId)
        => (from b in _context.Bets where b.BetterId == userId select b).ToList();

    public void DeleteBet(string id)
    {
        var bet = (from b in _context.Bets where b.Id == id select b).Single();
        _context.Bets.Remove(bet);
        _context.SaveChanges();
    }
}