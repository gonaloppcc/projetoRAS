using RasbetServer.Models.Events.Participants.Participant;

namespace RasbetServer.Repositories.ParticipantRepository;

public interface IParticipantRepository
{
    Task AddAsync(Participant participant);
    Task<Participant> GetAsync(string name);
    Task<IEnumerable<Participant>> ListBySportAsync(string sport);
}