using RasbetServer.Models.Events;

namespace RasbetServer.Repositories.CompetitionRepository;

public interface ICompetitionRepository
{
    Competition AddCompetition(Competition competition);
    Competition GetCompetition(string id);
    IEnumerable<Competition> GetAllCompetitions(string sportId);
}