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

        await entityEntry.ReloadAsync();
        return entityEntry.Entity;
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