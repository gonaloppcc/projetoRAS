using Castle.Core;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Users.Notifications;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Events;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly ICompetitionRepository _competitionRepository;
    private readonly ISportRepository _sportRepository;
    private readonly IBetRepository _betRepository;
    private readonly IUserRepository _userRepository;

    public EventService(
        IEventRepository eventRepository, 
        ICompetitionRepository competitionRepository, 
        ISportRepository sportRepository,
        IBetRepository betRepository,
        IUserRepository userRepository
    )
    {
        _eventRepository = eventRepository;
        _competitionRepository = competitionRepository;
        _sportRepository = sportRepository;
        _betRepository = betRepository;
        _userRepository = userRepository;
    }
    
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

    public async Task<ObjectResponse<IEnumerable<Event>>> CacheEvents(IEnumerable<Event> events)
    {
        IList<Event> eventList = new List<Event>();
        foreach (var e in events)
        {
            var prevEvent = await _eventRepository.GetByInfoAsync(e);
            if (prevEvent is null)
            {
                var newEvent = await _eventRepository.AddAsync(e);
                if (newEvent is null)
                    return new ObjectResponse<IEnumerable<Event>>($"Error adding one of the events", StatusCode.BadRequest);
                eventList.Add(newEvent);
            }
            else
            {
                if (!prevEvent.Compare(e))
                    CreateNotificationsForEventChanged(prevEvent);
                prevEvent.CopyFrom(e);
                await _eventRepository.UpdateAsync(prevEvent);
                eventList.Add(prevEvent);
            }
        }

        return new ObjectResponse<IEnumerable<Event>>(eventList);
    }

    private async Task CreateNotificationsForEventChanged(Event e)
    {
        foreach (var odd in e.Odds)
        {
            if (odd.Id is null)
                continue;
            var bets = await _betRepository.GetBetsFromOdd(odd.Id);
            if (bets is null)
                continue;
                        
            bets.ToList()
                .ForEach(b =>
                {
                    b.Better.Notifications.Add(new Notification(null, null, $"Event {e.Id} changed", NotificationSeverity.Medium));
                    _userRepository.UpdateAsync(b.Better);
                });
        }
    }
}