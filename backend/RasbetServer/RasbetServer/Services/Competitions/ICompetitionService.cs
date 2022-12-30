using RasbetServer.Models.Events;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Competitions;

public interface ICompetitionService
{
    Task<ObjectResponse<Competition>> AddAsync(Competition competition);
    Task<ObjectResponse<Competition>> GetAsync(string id);
    Task<ObjectResponse<IEnumerable<Competition>>> ListAsync(string sportId);
    Task<VoidResponse> DeleteAsync(string id);
}