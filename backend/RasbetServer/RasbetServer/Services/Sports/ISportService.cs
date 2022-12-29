using RasbetServer.Models.Events;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Sports;

public interface ISportService
{
    Task<ObjectResponse<Sport>> GetAsync(string name);
    Task<ObjectResponse<IEnumerable<Sport>>> ListAsync();
    Task<ObjectResponse<Sport>> AddAsync(Sport sport);
    Task<VoidResponse> DeleteAsync(string id);
}