using RasbetServer.Models.Events;

namespace RasbetServer.Repositories.EventRepository;

public interface IEventRepository
{
    Event GetEvent(string id);
    IEnumerable<Event> GetPage(string competitionId, int pageNum, int pageSize);
    Event AddEvent(Event e);
}