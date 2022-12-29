using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.ParticipantRepository;

public class ParticipantRepository : BaseRepository, IParticipantRepository
{
    public ParticipantRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Participant?> AddAsync(Participant participant)
    {
        try
        {
            var entityEntry = await _context.Participants.AddAsync(participant);
            await _context.SaveChangesAsync();
        
            await entityEntry.ReloadAsync();
            return entityEntry.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<Participant?> GetAsync(string name)
    {
        return await (
            from p
                in _context.Participants
            where p.Name == name
            select p
        ).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Participant>> ListBySportAsync(string sport)
    {
        return await (
            from p 
                in _context.Participants
            where p.SportId == sport
            select p
        ).ToListAsync();
    }
}