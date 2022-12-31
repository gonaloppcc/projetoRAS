using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.UserRepository;

public class UserRepository : BaseRepository, IUserRepository {
    public UserRepository(AppDbContext context) : base(context) {
    }

    public async Task<User?> GetAsync(string id)
    {
        return await (
            from u 
                in Context.Users
            where u.Id == id 
            select u
        ).SingleOrDefaultAsync();
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await (
            from u 
                in Context.Users
            where u.Email == email 
            select u
        ).SingleOrDefaultAsync();
    }

    public async Task<User?> AddAsync(User user) {
        try
        {
            if (user is Specialist specialist)
                specialist.Specialties.ToList().ForEach(sport => Context.Attach(sport));

            var newUser = Context.Users.Add(user);
            await Context.SaveChangesAsync();

            await newUser.ReloadAsync();
            return newUser.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<bool> DeleteAsync(User user)
    {
        try
        {
            Context.Users.Remove(user);
            await Context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }

    public async Task UpdateAsync(User user)
    {
        Context.Update(user);
        await Context.SaveChangesAsync();
    }
}