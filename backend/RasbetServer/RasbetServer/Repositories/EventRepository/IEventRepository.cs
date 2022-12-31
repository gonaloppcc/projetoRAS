using RasbetServer.Models.Events;

namespace RasbetServer.Repositories.EventRepository;

public interface IEventRepository
{
    Task<Event?> GetAsync(string id);
    Task<IEnumerable<Event>> ListByCompetitionAsync(string competitionId);
    Task<Event?> AddAsync(Event e);
    Task UpdateAsync(Event e);
    Task<Event?> GetByInfoAsync(Event e);
}