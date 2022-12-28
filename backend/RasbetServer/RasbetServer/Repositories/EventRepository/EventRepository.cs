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
        //FindAndReplaceParticipants(e);
        _context.AttachRange(e.Participants.GetParticipants());
        _context.Attach(e.Competition);

        var @event = await _context.Events.AddAsync(e);
        await _context.SaveChangesAsync();

        // Refresh _context cache
        @event.State = EntityState.Detached;
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
            result.Participant.PartId = participant[0].Name;
        }
    }
}