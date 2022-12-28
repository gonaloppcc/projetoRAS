using RasbetServer.Models.Events;

namespace RasbetServer.Repositories.EventRepository;

public interface IEventRepository
{
    Task<Event> GetAsync(string id);
    Task<IEnumerable<Event>> ListPageAsync(string competitionId, int pageNum, int pageSize);
    Task<Event> AddAsync(Event e);
}