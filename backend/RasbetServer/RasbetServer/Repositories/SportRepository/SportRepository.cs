using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.SportRepository;

public class SportRepository : BaseRepository, ISportRepository
{
    public SportRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Sport?> AddAsync(Sport sport)
    {
        try
        {
            var entityEntry = Context.Sports.Add(sport);
            await Context.SaveChangesAsync();

            await entityEntry.ReloadAsync();
            return entityEntry.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<Sport?> GetAsync(string name)
        => await (
            from s 
                in Context.Sports 
            where s.Name == name 
            select s
        ).SingleOrDefaultAsync();

    public async Task<IEnumerable<Sport>> ListAsync()
        => await Context.Sports.ToListAsync();

    public async Task<bool> DeleteAsync(Sport sport)
    {
        try
        {
            Context.Sports.Remove(sport);
            await Context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }
}