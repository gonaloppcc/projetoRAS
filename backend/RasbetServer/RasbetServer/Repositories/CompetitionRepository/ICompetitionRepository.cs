using RasbetServer.Models.Events;

namespace RasbetServer.Repositories.CompetitionRepository;

public interface ICompetitionRepository
{
    Task<Competition?> AddAsync(Competition competition);
    Task<Competition?> GetAsync(string id);
    Task<IEnumerable<Competition>> ListAsync(string sportId);
    Task<bool> DeleteAsync(Competition competition);
}