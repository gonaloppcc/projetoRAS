using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.ParticipantRepository;

public class ParticipantRepository : BaseRepository, IParticipantRepository
{
    public ParticipantRepository(AppDbContext context) : base(context)
    {
    }

    public async Task AddAsync(Participant participant)
    {
        var entityEntry = await _context.Participants.AddAsync(participant);
        await _context.SaveChangesAsync();

        entityEntry.State = EntityState.Detached;
    }

    public async Task<Participant> GetAsync(string name)
    {
        return await _context.Participants
            .Include(part => ((Team)part).Players)
            .FirstAsync(e => e.Name == name);
    }

    public async Task<IEnumerable<Participant>> ListBySportAsync(string sport)
    {
        return await (
            from p 
                in _context.Participants.Include(part => ((Team)part).Players)
            where p.SportId == sport
            select p
            ).ToListAsync();
    }
}