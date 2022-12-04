using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.SportRepository;

public class SportRepository : BaseRepository, ISportRepository
{
    public SportRepository(AppDbContext context) : base(context)
    {
    }

    public Sport AddSport(Sport s)
    {
        var sport = _context.Sports.Add(s);
        _context.SaveChanges();

        // Refresh _context cache
        sport.State = EntityState.Detached;
        return _context.Sports.Find(sport.Entity.Name) 
               ?? throw new InvalidOperationException();
    }

    public Sport GetSport(string name)
        => (from s in _context.Sports where s.Name == name select s).Single();

    public IEnumerable<Sport> GetAllSports()
        => _context.Sports.ToList();
}