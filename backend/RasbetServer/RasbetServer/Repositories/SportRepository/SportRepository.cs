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

        return sport.Entity;
    }

    public Sport GetSport(string id)
        => (from s in _context.Sports where s.Id == id select s).Single();

    public IEnumerable<Sport> GetAllSports()
        => _context.Sports.ToList();
}