using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories.ParticipantRepository;

namespace RasbetServer.Services.Participants;

public class ParticipantService : IParticipantService
{
    private readonly IParticipantRepository _participantRepository;

    public ParticipantService(IParticipantRepository participantRepository)
    {
        _participantRepository = participantRepository;
    }


    public async Task<Participant> GetAsync(string name)
    {
        return await _participantRepository.GetAsync(name);
    }

    public async Task<IEnumerable<Participant>> ListBySportAsync(string sport)
    {
        return await _participantRepository.ListBySportAsync(sport);
    }

    public async Task<Participant> AddAsync(Participant participant)
    {
        return await _participantRepository.AddAsync(participant);
    }
}