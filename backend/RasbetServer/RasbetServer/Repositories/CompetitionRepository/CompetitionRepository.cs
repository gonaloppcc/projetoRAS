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
            var comp = await _context.Competitions.AddAsync(c);
            await _context.SaveChangesAsync();
        
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
        return await (from c in _context.Competitions where c.Name == name select c).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Competition>> ListAsync(string sportId)
    {
        return await (from c in _context.Competitions where c.SportId == sportId select c).ToListAsync();
    }

    public async Task<bool> DeleteAsync(Competition competition)
    {
        try
        {
            _context.Competitions.Remove(competition);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }
}