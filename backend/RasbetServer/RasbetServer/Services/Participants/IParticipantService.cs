using RasbetServer.Models.Events.Participants.Participant;

namespace RasbetServer.Services.Participants;

public interface IParticipantService
{
    Task<Participant> GetAsync(string name);
    Task<IEnumerable<Participant>> ListBySportAsync(string sport);
    Task<Participant> AddAsync(Participant participant);
}