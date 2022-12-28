using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.CompetitionRepository;

public class CompetitionRepository : BaseRepository, ICompetitionRepository
{
    public CompetitionRepository(AppDbContext context) : base(context)
    { }
    
    public async Task<Competition> AddAsync(Competition c)
    {
        var comp = await _context.Competitions.AddAsync(c);
        await _context.SaveChangesAsync();
        
        await comp.ReloadAsync();
        return comp.Entity;
    }

    public async Task<Competition> GetAsync(string name)
    {
        return await (from c in _context.Competitions where c.Name == name select c).SingleAsync();
    }

    public async Task<IEnumerable<Competition>> ListAsync(string sportId)
    {
        return await (from c in _context.Competitions where c.SportId == sportId select c).ToListAsync();
    }
}