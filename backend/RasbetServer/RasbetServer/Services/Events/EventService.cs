using RasbetServer.Models.Events;
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
        var prevEvent = await _eventRepository.GetByInfoAsync(e);
        if (prevEvent is null)
        {
            var newEvent = await _eventRepository.AddAsync(e);
            if (newEvent is null)
                return new ObjectResponse<Event>("Error adding event", StatusCode.BadRequest);
            return new ObjectResponse<Event>(newEvent);
        }
        else
        {
            var eventChanged = await CreateNotificationsForEventChanged(prevEvent, e);
            if (eventChanged)
            {
                prevEvent.CopyFrom(e);
                await _eventRepository.UpdateAsync(prevEvent);
            }

            return new ObjectResponse<Event>(prevEvent);
        }
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
            var objectResponse = await AddAsync(e);
            if (!objectResponse.Success)
                continue;
            
            eventList.Add(objectResponse.Object!);
        }

        return new ObjectResponse<IEnumerable<Event>>(eventList);
    }

    private async Task<bool> CreateNotificationsForEventChanged(Event previous, Event newEvent)
    {
        var notifiedBetters = new List<string>();
        
        var changes = previous.Compare(newEvent)?.ToList();
        if (changes is null)
            return false;
        var notifications = Notification.CreateNotificationFromEventChanges(previous, changes).ToList();

        previous.Odds
            .ToList()
            .ForEach(async odd =>
            {
                if (odd.Id is null)
                    return;

                var bets = (await _betRepository.GetBetsFromOdd(odd.Id))?.ToList();

                bets?.ForEach(bet =>
                {
                    var better = bet.Better;
                    if (notifiedBetters.Any(id => id == better.Id))
                        return;
                    
                    notifications.ForEach(n => better.Notifications?.Add(n.Clone));
                    _userRepository.UpdateAsync(better);
                    notifiedBetters.Add(better.Id!);
                });
            });
        return true;
    }
}