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

    public Event GetEvent(string id)
        => (from e in _context.Events where e.Id == id select e).Single();

    public IEnumerable<Event> GetPage(string competitionId, int pageNum, int pageSize) 
        => (from e in _context.Events where e.CompetitionId == competitionId select e)
            .Skip(pageNum * pageSize).Take(pageSize);

    public Event AddEvent(Event e)
    {
        var @event = _context.Events.Add(e);
        _context.SaveChanges();

        // Refresh _context cache
        @event.State = EntityState.Detached;
        return _context.Events.Find(@event.Entity.Id) 
               ?? throw new InvalidOperationException();
    }
}