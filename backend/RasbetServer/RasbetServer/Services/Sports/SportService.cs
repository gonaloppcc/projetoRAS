using RasbetServer.Models.Events;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Sports;

public class SportService : ISportService
{
    public readonly ISportRepository _sportRepository;

    public SportService(ISportRepository sportRepository)
    {
        _sportRepository = sportRepository;
    }
    
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