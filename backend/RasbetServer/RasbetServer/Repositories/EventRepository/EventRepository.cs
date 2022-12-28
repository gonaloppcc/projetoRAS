using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.EventRepository;

public class EventRepository : BaseRepository, IEventRepository
{
    public EventRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Event> GetAsync(string id)
    {
        return await (
            from e 
                in _context.Events
            where e.Id == id 
            select e
        ).SingleAsync();
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

    public async Task AddAsync(Event e)
    {
        var @event = await _context.Events.AddAsync(e);
        await _context.SaveChangesAsync();

        // Refresh _context cache
        @event.State = EntityState.Detached;
    }
}