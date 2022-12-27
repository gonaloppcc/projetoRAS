using RasbetServer.Models.Users;

namespace RasbetServer.Repositories.UserRepository;

public interface IUserRepository {
    Task<User> GetUserAsync(string id);
    Task<User> GetUserByEmailAsync(string email);
    Task AddUserAsync(User user);
    Task DeleteUserAsync(User user);
    Task UpdateUserAsync(User user);
}