using RasbetServer.Models.Events;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Repositories.ParticipantRepository;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Events;

public class EventService : BaseService, IEventService
{
    public EventService(
        IBetRepository betRepository,
        ICompetitionRepository competitionRepository, 
        ISportRepository sportRepository,
        IParticipantRepository participantRepository, 
        IEventRepository eventRepository,
        IUserRepository userRepository
    ) : base (betRepository, competitionRepository, sportRepository, participantRepository, eventRepository, userRepository)
    { }
    
    public async Task<ObjectResponse<Event>> GetAsync(string id)
    {
        var e = await _eventRepository.GetAsync(id);
        if (e is null)
            return new ObjectResponse<Event>("Event not found", StatusCode.NotFound);
        
        return new ObjectResponse<Event>(e);
    }

    public async Task<ObjectResponse<Event>> AddAsync(Event e)
    {
        var added = await _eventRepository.AddAsync(e);
        if (added is null)
            return new ObjectResponse<Event>("Event already exists", StatusCode.Conflict);
        
        return new ObjectResponse<Event>(added);
    }

    public async Task<ObjectResponse<IEnumerable<Event>>> ListPageByCompetitionAsync(string competitionId, int pageNum, int pageSize)
    {
        var comp = await _competitionRepository.GetAsync(competitionId);
        if (comp is null)
            return new ObjectResponse<IEnumerable<Event>>("Competition not found", StatusCode.NotFound);

        var eventList = (await _eventRepository.ListByCompetitionAsync(competitionId))
            .OrderBy(e => e.Date)
            .Skip(pageNum * pageSize)
            .Take(pageSize);
        return new ObjectResponse<IEnumerable<Event>>(eventList);
    }

    public async Task<ObjectResponse<IEnumerable<Event>>> ListPageBySportAsync(string sportId, int pageNum, int pageSize)
    {
        var sport = await _sportRepository.GetAsync(sportId);
        if (sport is null)
            return new ObjectResponse<IEnumerable<Event>>("Sport not found", StatusCode.NotFound);

        var compList = await _competitionRepository.ListAsync(sportId);
        IEnumerable<Event> eventList = new List<Event>();
        foreach (var competition in compList)
        {
            var events = await _eventRepository.ListByCompetitionAsync(competition.Name);
            eventList = eventList.Concat(events);
        }

        eventList = eventList.OrderBy(e => e.Date).Skip(pageNum * pageSize).Take(pageSize);
        return new ObjectResponse<IEnumerable<Event>>(eventList);
    }
}