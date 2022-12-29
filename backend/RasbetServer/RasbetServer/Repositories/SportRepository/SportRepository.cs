using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.SportRepository;

public class SportRepository : BaseRepository, ISportRepository
{
    public SportRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Sport?> AddAsync(Sport sport)
    {
        try
        {
            var entityEntry = _context.Sports.Add(sport);
            await _context.SaveChangesAsync();

            await entityEntry.ReloadAsync();
            return entityEntry.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<Sport?> GetAsync(string name)
        => await (
            from s 
                in _context.Sports 
            where s.Name == name 
            select s
        ).SingleOrDefaultAsync();

    public async Task<IEnumerable<Sport>> ListAsync()
        => await _context.Sports.ToListAsync();

    public async Task<bool> DeleteAsync(Sport sport)
    {
        try
        {
            _context.Sports.Remove(sport);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }
}