using RasbetServer.Models.Users;
using RasbetServer.Models.Users.Better;

namespace RasbetServer.Repositories.UserRepository;

public interface IUserRepository {
    Task<User?> GetAsync(string id);
    Task<User?> GetByEmailAsync(string email);
    Task<User?> AddAsync(User user);
    Task<bool> DeleteAsync(User user);
    Task UpdateAsync(User user);
    Task<Transaction?> AddTransactionAsync(Transaction transaction);
}