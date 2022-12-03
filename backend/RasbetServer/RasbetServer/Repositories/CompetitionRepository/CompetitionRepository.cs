using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.CompetitionRepository;

public class CompetitionRepository : BaseRepository, ICompetitionRepository
{
    public CompetitionRepository(AppDbContext context) : base(context)
    { }
    
    public Competition AddCompetition(Competition c)
    {
        var comp = _context.Competitions.Add(c);
        _context.SaveChanges();

        return comp.Entity;
    }

    public Competition GetCompetition(string id)
        => (from c in _context.Competitions where c.Id == id select c).Single();

    public IEnumerable<Competition> GetAllCompetitions(string sportId)
        => (from c in _context.Competitions where c.SportId == sportId select c).ToList();
}