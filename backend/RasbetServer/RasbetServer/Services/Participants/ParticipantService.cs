using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Repositories.ParticipantRepository;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Participants;

public class ParticipantService : BaseService, IParticipantService
{
    public ParticipantService(
        IBetRepository betRepository,
        ICompetitionRepository competitionRepository, 
        ISportRepository sportRepository,
        IParticipantRepository participantRepository, 
        IEventRepository eventRepository,
        IUserRepository userRepository
    ) : base (betRepository, competitionRepository, sportRepository, participantRepository, eventRepository, userRepository)
    { }

    public async Task<ObjectResponse<Participant>> GetAsync(string name)
    {
        var participant = await _participantRepository.GetAsync(name);
        if (participant is null)
            return new ObjectResponse<Participant>("Participant not found", StatusCode.NotFound);
        
        return new ObjectResponse<Participant>(participant);
    }

    public async Task<ObjectResponse<IEnumerable<Participant>>> ListBySportAsync(string sportId)
    {
        var sport = await _sportRepository.GetAsync(sportId);
        if (sport is null)
            return new ObjectResponse<IEnumerable<Participant>>("Sport not found", StatusCode.NotFound);
        
        return new ObjectResponse<IEnumerable<Participant>>(await _participantRepository.ListBySportAsync(sportId));
    }

    public async Task<ObjectResponse<Participant>> AddAsync(Participant participant)
    {
        var added = await _participantRepository.AddAsync(participant);
        if (added is null)
            return new ObjectResponse<Participant>("Participant already exists", StatusCode.Conflict);
        
        return new ObjectResponse<Participant>(added);
    }
}