using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.ParticipantRepository;

public class ParticipantRepository : BaseRepository, IParticipantRepository
{
    public ParticipantRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Participant> AddAsync(Participant participant)
    {
        var entityEntry = await _context.Participants.AddAsync(participant);
        await _context.SaveChangesAsync();
        
        await entityEntry.ReloadAsync();
        return entityEntry.Entity;
    }

    public async Task<Participant> GetAsync(string name)
    {
        return await _context.Participants.FirstAsync(e => e.Name == name);
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