using RasbetServer.Models.Users;
using RasbetServer.Models.Users.Better;
using RasbetServer.Models.Users.Notifications;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Users;

public interface IUserService
{
    Task<ObjectResponse<User>> LoginAsync(string email, string password);
    Task<ObjectResponse<User>> RegisterAsync(User user);
    Task<VoidResponse> DeleteUserAsync(string id);
    Task<VoidResponse> ChangePasswordAsync(string id, string newPassword);
    Task<ObjectResponse<float>> UpdateBalanceAsync(string id, float amount);
    Task<ObjectResponse<IEnumerable<Transaction>>> GetTransactionHist(string id);
    Task<ObjectResponse<IEnumerable<Notification>>> GetNotificationsAsync(string userId);
    Task<VoidResponse> CancelNotificationAsync(string notificationId);
}