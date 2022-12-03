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
        var newBet = _context.Bets.Add(bet);
        
        user.TransactionHist.Add(new Transaction(-bet.Amount));
        _context.SaveChanges();

        return newBet.Entity;
    }

    public Bet GetBet(string id)
        => (from b in _context.Bets where b.Id == id select b).Single();

    public IEnumerable<Bet> GetBets(string userId)
        => (from b in _context.Bets where b.BetterId == userId select b).ToList();
}