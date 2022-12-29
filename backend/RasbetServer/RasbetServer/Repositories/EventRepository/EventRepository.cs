using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.EventRepository;

public class EventRepository : BaseRepository, IEventRepository
{
    public EventRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Event?> GetAsync(string id)
    {
        return await (
            from e 
                in _context.Events
            where e.Id == id 
            select e
        ).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Event>> ListPageAsync(string competitionId, int pageNum, int pageSize)
    {
        return await (
                from e
                    in _context.Events
                where e.CompetitionId == competitionId 
                select e
            )
            .Skip(pageNum * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<Event?> AddAsync(Event e)
    {
        try
        {
            var entityEntry = await _context.Events.AddAsync(e);
            await _context.SaveChangesAsync();

            await entityEntry.ReloadAsync();
            return entityEntry.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }
}