using Microsoft.EntityFrameworkCore;
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
        
        // Refresh _context cache
        comp.State = EntityState.Detached;
        return _context.Competitions.Find(comp.Entity.Name) 
               ?? throw new InvalidOperationException();
    }

    public Competition GetCompetition(string name)
        => (from c in _context.Competitions where c.Name == name select c).Single();

    public IEnumerable<Competition> GetAllCompetitions(string sportId)
        => (from c in _context.Competitions where c.SportId == sportId select c).ToList();
}