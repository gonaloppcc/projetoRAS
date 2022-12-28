using RasbetServer.Models.Users;

namespace RasbetServer.Services.Users;

public interface IUserService
{
    Task<User> LoginAsync(string email, string password);
    Task<User> RegisterAsync(User user);
    Task DeleteUserAsync(string id);
    Task ChangePasswordAsync(string id, string newPassword);
    Task<float> UpdateBalanceAsync(string id, float amount);
    Task<IEnumerable<Transaction>> GetTransactionHist(string id);
}