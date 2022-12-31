using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.EventRepository;

public class EventRepository : BaseRepository, IEventRepository
{
    public EventRepository(AppDbContext context) : base(context)
    { }

    public async Task<Event?> GetAsync(string id)
    {
        return await (
            from e 
                in Context.Events
            where e.Id == id 
            select e
        ).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Event>> ListByCompetitionAsync(string competitionId)
    {
        return await (
                from e
                    in Context.Events
                where e.CompetitionId == competitionId 
                select e
            )
            .ToListAsync();
    }

    public async Task<Event?> AddAsync(Event e)
    {
        try
        {
            var entityEntry = await Context.Events.AddAsync(e);
            await Context.SaveChangesAsync();

            await entityEntry.ReloadAsync();
            return entityEntry.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task UpdateAsync(Event e)
    {
        Context.Events.Update(e);
        await Context.SaveChangesAsync();
    }

    public async Task<Event?> GetByInfoAsync(Event e1)
    {
        var participants = e1.Participants.GetParticipants().Select(p => p.Participant.PartId).ToList();
        var eventsAtDate = await (
            from e2
                in Context.Events
            where e2.Date == e1.Date
            select e2
        ).ToListAsync();

        return (
            from e2 in eventsAtDate
            where e2.Participants.GetParticipants()
                .All(r => participants.Any(participant => participant == r.Participant.PartId))
            select e2
        ).SingleOrDefault();
    }
}