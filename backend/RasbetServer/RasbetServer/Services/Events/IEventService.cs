using RasbetServer.Models.Events;

namespace RasbetServer.Services.Events;

public interface IEventService
{
    Task<Event> GetAsync(string id);
    Task<IEnumerable<Event>> ListPageAsync(string competitionId, int pageNum, int pageSize);
    Task<Event> AddAsync(Event e);
}