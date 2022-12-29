using RasbetServer.Models.Events;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Repositories.ParticipantRepository;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Competitions;

public class CompetitionsService : BaseService, ICompetitionService
{
    public CompetitionsService(
        IBetRepository betRepository,
        ICompetitionRepository competitionRepository, 
        ISportRepository sportRepository,
        IParticipantRepository participantRepository, 
        IEventRepository eventRepository,
        IUserRepository userRepository
    ) : base (betRepository, competitionRepository, sportRepository, participantRepository, eventRepository, userRepository)
    { }
    
    public async Task<ObjectResponse<Competition>> AddAsync(Competition competition)
    {
        var comp = await _competitionRepository.AddAsync(competition);
        if (comp is null)
            return new ObjectResponse<Competition>("Competition already exists", StatusCode.Conflict);
        
        return new ObjectResponse<Competition>(comp);
    }

    public async Task<ObjectResponse<Competition>> GetAsync(string id)
    {
        var comp = await _competitionRepository.GetAsync(id);
        if (comp is null)
            return new ObjectResponse<Competition>("Competition not found", StatusCode.NotFound);
        
        return new ObjectResponse<Competition>(comp);
    }

    public async Task<ObjectResponse<IEnumerable<Competition>>> ListAsync(string sportId)
    {
        var sport = await _sportRepository.GetAsync(sportId);
        if (sport is null)
            return new ObjectResponse<IEnumerable<Competition>>("Sport not found", StatusCode.NotFound);
        
        return new ObjectResponse<IEnumerable<Competition>>(await _competitionRepository.ListAsync(sportId));
    }

    public async Task<VoidResponse> DeleteAsync(string id)
    {
        var competition = await _competitionRepository.GetAsync(id);
        if (competition is null)
            return new VoidResponse("Competition not found", StatusCode.NotFound);

        bool deleted = await _competitionRepository.DeleteAsync(competition);
        if (!deleted)
            return new VoidResponse("Unknown error deleting competition", StatusCode.BadRequest);
        
        return new VoidResponse();
    }
}