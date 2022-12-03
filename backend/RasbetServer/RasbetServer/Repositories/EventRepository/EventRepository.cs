using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.EventRepository;

public class EventRepository : BaseRepository, IEventRepository
{
    public EventRepository(AppDbContext context) : base(context)
    {
    }

    private IEnumerable<Player> GetTeamPlayers(string teamId)
    {
        return (from p in _context.Players where p.TeamId == teamId select p).ToList();
    }

    private Participant GetParticipant(string id)
    {
        var participant = (from p in _context.Participants where p.Id == id select p).Single();

        if (participant is Team team)
        {
            team.Players = GetTeamPlayers(team.Id).ToList();
        }

        return participant;
    }
    
    private ParticipantOdd GetParticipantOdd(string id)
    {
        var participantOdd = (from p in _context.ParticipantOdds where p.Id == id select p).Single();
        participantOdd.Part = GetParticipant(participantOdd.PartId);
        
        return participantOdd;
    }

    private Result GetResult(string id)
    {
        var result = (from r in _context.Results where r.Id == id select r).Single();
        result.Participant = GetParticipantOdd(result.ParticipantId);

        return result;
    }
    
    private BaseParticipants GetParticipants(string id)
    {
        var participants = (from p in _context.BaseParticipants where p.Id == id select p).Single();
        switch (participants)
        {
            case TwoParticipants tp:
                tp.Home = GetResult(tp.HomeId);
                tp.Away = GetResult(tp.AwayId);
                break;
        }

        return participants;
    }

    public Event GetEvent(string id)
    {
        var @event = (from e in _context.Events where e.Id == id select e).Single();
        @event.Participants = GetParticipants(@event.ParticipantsId ?? throw new InvalidOperationException());

        return @event;
    }

    public IEnumerable<Event> GetPage(string competitionId, int pageNum, int pageSize)
    {
        var events = (from e in _context.Events where e.CompetitionId == competitionId select e)
            .Skip(pageNum * pageSize).Take(pageSize);

        foreach (var @event in events)
        {
            @event.Participants = GetParticipants(@event.ParticipantsId ?? throw new InvalidOperationException());
        }

        return events;
    }

    public Event AddEvent(Event e)
    {
        var @event = _context.Events.Add(e);
        _context.SaveChanges();

        return @event.Entity;
    }
}