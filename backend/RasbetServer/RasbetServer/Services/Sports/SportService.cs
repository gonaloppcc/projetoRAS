using RasbetServer.Models.Events;
using RasbetServer.Repositories.SportRepository;

namespace RasbetServer.Services.Sports;

public class SportService : ISportService
{
    public readonly ISportRepository _sportRepository;

    public SportService(ISportRepository sportRepository)
    {
        _sportRepository = sportRepository;
    }
    
    public async Task<Sport> GetAsync(string name)
    {
        return await _sportRepository.GetAsync(name);
    }

    public async Task<IEnumerable<Sport>> ListAsync()
    {
        return await _sportRepository.ListAsync();
    }

    public async Task<Sport> AddAsync(Sport sport)
    {
        return await _sportRepository.AddAsync(sport);
    }
}