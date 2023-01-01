using RasbetServer.Models.Bets.Odds;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.OddRepository;

public class OddRepository : BaseRepository, IOddRepository
{
    public OddRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Odd?> GetAsync(string id)
    {
        return await Context.Odds.FindAsync(id);
    }

    public async Task UpdateAsync(Odd o)
    {
        Context.Odds.Update(o);
        await Context.SaveChangesAsync();
    }
}