using RasbetServer.Models.Events;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Events;

public interface IEventService
{
    Task<ObjectResponse<Event>> GetAsync(string id);
    Task<ObjectResponse<Event>> AddAsync(Event e);
    Task<ObjectResponse<Event>> UpdateAsync(string id, Event e);

    Task<ObjectResponse<IEnumerable<Event>>>
        ListPageByCompetitionAsync(string competitionId, int pageNum, int pageSize);

    Task<ObjectResponse<IEnumerable<Event>>> ListPageBySportAsync(string sportId, int pageNum, int pageSize);
    Task<ObjectResponse<IEnumerable<Event>>> CacheEvents(IEnumerable<Event> events);

    Task<VoidResponse> Subscribe(string idUser, string idEvent);
}