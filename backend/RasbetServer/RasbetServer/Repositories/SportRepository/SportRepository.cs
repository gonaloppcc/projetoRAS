using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.SportRepository;

public class SportRepository : BaseRepository, ISportRepository
{
    public SportRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Sport> AddAsync(Sport sport)
    {
        var entityEntry = _context.Sports.Add(sport);
        await _context.SaveChangesAsync();

        // Refresh _context cache
        entityEntry.State = EntityState.Detached;
        return await _context.Sports.FirstAsync(e=> e.Name == entityEntry.Entity.Name) 
               ?? throw new InvalidOperationException();
    }

    public async Task<Sport> GetAsync(string name)
        => await (
            from s 
                in _context.Sports 
            where s.Name == name 
            select s
            ).SingleAsync();

    public async Task<IEnumerable<Sport>> ListAsync()
        => await _context.Sports.ToListAsync();
}