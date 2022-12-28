using RasbetServer.Models.Events;

namespace RasbetServer.Services.Competitions;

public interface ICompetitionService
{
    Task<Competition> AddAsync(Competition competition);
    Task<Competition> GetAsync(string id);
    Task<IEnumerable<Competition>> ListAsync(string sportId);
}