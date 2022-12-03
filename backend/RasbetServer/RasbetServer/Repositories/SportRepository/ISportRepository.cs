using RasbetServer.Models.Events;

namespace RasbetServer.Repositories.SportRepository;

public interface ISportRepository
{
    Sport AddSport(Sport s);
    Sport GetSport(string id);
    IEnumerable<Sport> GetAllSports();
}