using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Participants;

public interface IParticipantService
{
    Task<ObjectResponse<Participant>> GetAsync(string name);
    Task<ObjectResponse<IEnumerable<Participant>>> ListBySportAsync(string sport);
    Task<ObjectResponse<Participant>> AddAsync(Participant participant);
}