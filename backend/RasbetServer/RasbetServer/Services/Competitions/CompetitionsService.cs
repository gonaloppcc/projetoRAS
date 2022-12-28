using RasbetServer.Models.Events;
using RasbetServer.Repositories.CompetitionRepository;

namespace RasbetServer.Services.Competitions;

public class CompetitionsService : ICompetitionService
{
    private readonly ICompetitionRepository _competitionRepository;

    public CompetitionsService(ICompetitionRepository competitionRepository)
    {
        _competitionRepository = competitionRepository;
    }
    
    public async Task<Competition> AddAsync(Competition competition)
    {
        return await _competitionRepository.AddAsync(competition);
    }

    public async Task<Competition> GetAsync(string id)
    {
        return await _competitionRepository.GetAsync(id);
    }

    public async Task<IEnumerable<Competition>> ListAsync(string sportId)
    {
        return await _competitionRepository.ListAsync(sportId);
    }
}