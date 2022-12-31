using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.CompetitionRepository;

public class CompetitionRepository : BaseRepository, ICompetitionRepository
{
    public CompetitionRepository(AppDbContext context) : base(context)
    { }
    
    public async Task<Competition?> AddAsync(Competition c)
    {
        try
        {
            var comp = await Context.Competitions.AddAsync(c);
            await Context.SaveChangesAsync();
        
            await comp.ReloadAsync();
            return comp.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<Competition?> GetAsync(string name)
    {
        return await (from c in Context.Competitions where c.Name == name select c).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Competition>> ListAsync(string sportId)
    {
        return await (from c in Context.Competitions where c.SportId == sportId select c).ToListAsync();
    }

    public async Task<bool> DeleteAsync(Competition competition)
    {
        try
        {
            Context.Competitions.Remove(competition);
            await Context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }
}