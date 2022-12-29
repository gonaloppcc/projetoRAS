using RasbetServer.Models.Events;

namespace RasbetServer.Repositories.SportRepository;

public interface ISportRepository
{
    Task<Sport?> AddAsync(Sport sport);
    Task<Sport?> GetAsync(string id);
    Task<IEnumerable<Sport>> ListAsync();
    Task<bool> DeleteAsync(Sport sport);
}