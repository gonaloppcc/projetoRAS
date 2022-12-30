using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Repositories.ParticipantRepository;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Repositories.UserRepository;

namespace RasbetServer.Services;

public abstract class BaseService
{
    protected readonly IBetRepository _betRepository;
    protected readonly ICompetitionRepository _competitionRepository;
    protected readonly ISportRepository _sportRepository;
    protected readonly IParticipantRepository _participantRepository;
    protected readonly IEventRepository _eventRepository;
    protected readonly IUserRepository _userRepository;

    protected BaseService(
        IBetRepository betRepository,
        ICompetitionRepository competitionRepository,
        ISportRepository sportRepository,
        IParticipantRepository participantRepository,
        IEventRepository eventRepository,
        IUserRepository userRepository
    )
    {
        _betRepository = betRepository;
        _competitionRepository = competitionRepository;
        _sportRepository = sportRepository;
        _participantRepository = participantRepository;
        _eventRepository = eventRepository;
        _userRepository = userRepository;
    }
}