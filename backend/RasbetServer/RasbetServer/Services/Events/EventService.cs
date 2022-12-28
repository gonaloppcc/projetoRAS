using RasbetServer.Models.Events;
using RasbetServer.Repositories.EventRepository;

namespace RasbetServer.Services.Events;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    
    public EventService(IEventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }
    
    public Task<Event> GetAsync(string id)
    {
        return _eventRepository.GetAsync(id);
    }

    public Task<IEnumerable<Event>> ListPageAsync(string competitionId, int pageNum, int pageSize)
    {
        return _eventRepository.ListPageAsync(competitionId, pageNum, pageSize);
    }

    public async Task<Event> AddAsync(Event e)
    {
        return await _eventRepository.AddAsync(e);
    }
}