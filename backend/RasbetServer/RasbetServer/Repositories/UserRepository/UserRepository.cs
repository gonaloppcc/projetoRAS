using Microsoft.EntityFrameworkCore;
using RasbetServer.Exceptions.Users;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.UserRepository;

public class UserRepository : BaseRepository, IUserRepository {
    public UserRepository(AppDbContext context) : base(context) {
    }

    public async Task<User> GetUserAsync(string id)
    {
        try
        {
            return await (
                from u 
                    in _context.Users
                        .Include(user => ((Specialist)user).Specialties)
                        .Include(user => ((Better)user).TransactionHist)
                where u.Id == id 
                select u
            ).SingleAsync();
        }
        catch (InvalidOperationException e)
        {
            throw new UserNotFoundException("User with the specified Id does not exist", e);
        }
        
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        try
        {
            return await (
                from u 
                    in _context.Users
                        .Include(user => ((Specialist)user).Specialties)
                        .Include(user => ((Better)user).TransactionHist)
                where u.Email == email 
                select u
            ).SingleAsync();
        }
        catch (InvalidOperationException e)
        {
            throw new UserNotFoundException("User with the specified email does not exist", e);
        }
        
    }

    public async Task AddUserAsync(User user) {
        if (user is Specialist specialist)
        {
            specialist.Specialties.ToList().ForEach(sport => _context.Attach(sport));
        }
        
        var newUser = _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Refresh _context cache
        newUser.State = EntityState.Detached;
    }

    public async Task DeleteUserAsync(User user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateUserAsync(User user)
    {
        _context.Update(user);
        await _context.SaveChangesAsync();
    }
}