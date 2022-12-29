using RasbetServer.Models.Events;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Events;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly ICompetitionRepository _competitionRepository;
    
    public EventService(IEventRepository eventRepository, ICompetitionRepository competitionRepository)
    {
        _eventRepository = eventRepository;
        _competitionRepository = competitionRepository;
    }
    
    public async Task<ObjectResponse<Event>> GetAsync(string id)
    {
        var e = await _eventRepository.GetAsync(id);
        if (e is null)
            return new ObjectResponse<Event>("Event not found", StatusCode.NotFound);
        
        return new ObjectResponse<Event>(e);
    }

    public async Task<ObjectResponse<IEnumerable<Event>>> ListPageAsync(string competitionId, int pageNum, int pageSize)
    {
        var comp = await _competitionRepository.GetAsync(competitionId);
        if (comp is null)
            return new ObjectResponse<IEnumerable<Event>>("Competition not found", StatusCode.NotFound);
        
        return new ObjectResponse<IEnumerable<Event>>(await _eventRepository.ListPageAsync(competitionId, pageNum, pageSize));
    }

    public async Task<ObjectResponse<Event>> AddAsync(Event e)
    {
        var added = await _eventRepository.AddAsync(e);
        if (added is null)
            return new ObjectResponse<Event>("Event already exists", StatusCode.Conflict);
        
        return new ObjectResponse<Event>(added);
    }
}