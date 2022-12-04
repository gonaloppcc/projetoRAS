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
            .Skip(pageNum * pageSize).Take(pageSize).ToList();

    public Event AddEvent(Event e)
    {
        FindAndReplaceParticipants(e);
        
        var @event = _context.Events.Add(e);
        _context.SaveChanges();

        // Refresh _context cache
        @event.State = EntityState.Detached;
        return _context.Events.Find(@event.Entity.Id) 
               ?? throw new InvalidOperationException();
    }

    private void FindAndReplaceParticipants(Event e)
    {
        var results = e.Participants.GetParticipants();

        foreach (var result in results)
        {
            var participant = (from p in _context.Participants where p.Name == result.Participant.Part.Name select p)
                .ToList();
            if (participant.Count == 0)
                continue;
            
            result.Participant.Part = null;
            result.Participant.PartId = participant[0].Id;
        }
    }
}