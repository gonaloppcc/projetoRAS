using RasbetServer.Models.Events;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Repositories.ParticipantRepository;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Sports;

public class SportService : BaseService, ISportService
{
    public SportService(
        IBetRepository betRepository,
        ICompetitionRepository competitionRepository, 
        ISportRepository sportRepository,
        IParticipantRepository participantRepository, 
        IEventRepository eventRepository,
        IUserRepository userRepository
    ) : base (betRepository, competitionRepository, sportRepository, participantRepository, eventRepository, userRepository)
    { }
    
    public async Task<ObjectResponse<Sport>> GetAsync(string name)
    {
        var sport = await _sportRepository.GetAsync(name);
        if (sport is null)
            return new ObjectResponse<Sport>("Sport not found", StatusCode.NotFound);
        
        return new ObjectResponse<Sport>(sport);
    }

    public async Task<ObjectResponse<IEnumerable<Sport>>> ListAsync()
    {
        return new ObjectResponse<IEnumerable<Sport>>(await _sportRepository.ListAsync());
    }

    public async Task<ObjectResponse<Sport>> AddAsync(Sport sport)
    {
        var newSport = await _sportRepository.AddAsync(sport);
        if (newSport is null)
            return new ObjectResponse<Sport>("Sport or competitions already exist", StatusCode.Conflict);
        
        return new ObjectResponse<Sport>(newSport);
    }

    public async Task<VoidResponse> DeleteAsync(string id)
    {
        var sport = await _sportRepository.GetAsync(id);
        if (sport is null)
            return new VoidResponse("Sport not found", StatusCode.NotFound);

        bool deleted = await _sportRepository.DeleteAsync(sport);
        if (!deleted)
            return new VoidResponse("Unknown error deleting sport", StatusCode.BadRequest);

        return new VoidResponse();
    }
}