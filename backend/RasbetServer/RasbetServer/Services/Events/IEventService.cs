using RasbetServer.Models.Events;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Events;

public interface IEventService
{
    Task<ObjectResponse<Event>> GetAsync(string id);
    Task<ObjectResponse<IEnumerable<Event>>> ListPageAsync(string competitionId, int pageNum, int pageSize);
    Task<ObjectResponse<Event>> AddAsync(Event e);
}