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
        return _context.Sports.Find(sport.Entity.Id) 
               ?? throw new InvalidOperationException();
    }

    public Sport GetSport(string id)
        => (from s in _context.Sports where s.Id == id select s).Single();

    public IEnumerable<Sport> GetAllSports()
        => _context.Sports.ToList();
}