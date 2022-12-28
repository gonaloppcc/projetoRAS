using RasbetServer.Models.Users;

namespace RasbetServer.Repositories.UserRepository;

public interface IUserRepository {
    Task<User> GetAsync(string id);
    Task<User> GetByEmailAsync(string email);
    Task<User> AddAsync(User user);
    Task DeleteAsync(User user);
    Task UpdateAsync(User user);
    Task<Transaction> AddTransactionAsync(Transaction transaction);
}