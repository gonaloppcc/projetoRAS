using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Bets;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.BetRepository;

public class BetRepository : BaseRepository, IBetRepository
{
    public BetRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Bet?> AddAsync(Bet bet)
    {
        try
        {
            var odds = bet.GetOdds();
            Context.Odds.AttachRange(odds);

            var entityEntry = await Context.Bets.AddAsync(bet);
            await Context.SaveChangesAsync();

            await entityEntry.ReloadAsync();
            return entityEntry.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<Bet?> GetAsync(string id)
    {
        return await (from b in Context.Bets where b.Id == id select b).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Bet>> ListAsync(string userId)
    {
        return await (from b in Context.Bets where b.BetterId == userId select b).ToListAsync();
    }

    public async Task<bool> DeleteAsync(Bet bet)
    {
        try
        {
            Context.Bets.Remove(bet);
            await Context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }
}