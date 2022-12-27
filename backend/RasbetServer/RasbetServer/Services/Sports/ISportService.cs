using RasbetServer.Models.Events;

namespace RasbetServer.Services.Sports;

public interface ISportService
{
    Task<Sport> GetAsync(string name);
    Task<IEnumerable<Sport>> ListAsync();
    Task<Sport> AddAsync(Sport sport);
}