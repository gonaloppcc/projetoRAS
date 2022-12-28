using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Bets;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.BetRepository;

public class BetRepository : BaseRepository, IBetRepository
{
    public BetRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Bet> AddAsync(Bet bet)
    {
        var odds = bet.GetOdds();
        _context.Odds.AttachRange(odds);
        
        var entityEntry = await _context.Bets.AddAsync(bet);
        await _context.SaveChangesAsync();

        await entityEntry.ReloadAsync();
        return entityEntry.Entity;
    }

    public async Task<Bet> GetAsync(string id)
    {
        return await (from b in _context.Bets where b.Id == id select b).SingleAsync();
    }

    public async Task<IEnumerable<Bet>> ListAsync(string userId)
    {
        return await (from b in _context.Bets where b.BetterId == userId select b).ToListAsync();
    }

    public async Task DeleteAsync(string id)
    {
        //var bet = (from b in _context.Bets where b.Id == id select b).SingleAsync();
        var bet = await GetAsync(id);
        _context.Bets.Remove(bet);
        await _context.SaveChangesAsync();
    }
}