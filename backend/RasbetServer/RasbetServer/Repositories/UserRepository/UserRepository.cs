using Microsoft.EntityFrameworkCore;
using RasbetServer.Exceptions.Users;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.UserRepository;

public class UserRepository : BaseRepository, IUserRepository {
    public UserRepository(AppDbContext context) : base(context) {
    }

    public async Task<User> GetAsync(string id)
    {
        try
        {
            return await (
                from u 
                    in _context.Users
                where u.Id == id 
                select u
            ).SingleAsync();
        }
        catch (InvalidOperationException e)
        {
            throw new UserNotFoundException("User with the specified Id does not exist", e);
        }
        
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        try
        {
            return await (
                from u 
                    in _context.Users
                where u.Email == email 
                select u
            ).SingleAsync();
        }
        catch (InvalidOperationException e)
        {
            throw new UserNotFoundException("User with the specified email does not exist", e);
        }
        
    }

    public async Task<User> AddAsync(User user) {
        if (user is Specialist specialist)
        {
            specialist.Specialties.ToList().ForEach(sport => _context.Attach(sport));
        }
        
        var newUser = _context.Users.Add(user);
        await _context.SaveChangesAsync();

        await newUser.ReloadAsync();
        return newUser.Entity;
    }

    public async Task DeleteAsync(User user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        _context.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task<Transaction> AddTransactionAsync(Transaction transaction)
    {
        var entityEntry = _context.Transactions.Add(transaction);
        await _context.SaveChangesAsync();

        await entityEntry.ReloadAsync();
        return entityEntry.Entity;
    }
}