using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RasbetServer.Extensions;
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
                in _context.Users
            where u.Id == id 
            select u
        ).SingleOrDefaultAsync();
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await (
            from u 
                in _context.Users
            where u.Email == email 
            select u
        ).SingleOrDefaultAsync();
    }

    public async Task<User?> AddAsync(User user) {
        try
        {
            if (user is Specialist specialist)
                specialist.Specialties.ToList().ForEach(sport => _context.Attach(sport));

            var newUser = _context.Users.Add(user);
            await _context.SaveChangesAsync();

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
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }

    public async Task UpdateAsync(User user)
    {
        _context.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task<Transaction?> AddTransactionAsync(Transaction transaction)
    {
        try
        {
            var entityEntry = _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            await entityEntry.ReloadAsync();
            return entityEntry.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }
}