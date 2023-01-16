using RasbetServer.Models.Users;
using RasbetServer.Models.Users.Better;
using RasbetServer.Models.Users.Notifications;
using RasbetServer.Repositories.NotificationRepository;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Services.Communication;

namespace RasbetServer.Services.Users;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly INotificationRepository _notificationRepository;
    
    public UserService(IUserRepository userRepository, INotificationRepository notificationRepository)
    {
        _userRepository = userRepository;
        _notificationRepository = notificationRepository;
    }
    
    public async Task<ObjectResponse<User>> LoginAsync(string email, string password)
    {
        var user = await _userRepository.GetByEmailAsync(email);
        if (user is null)
            return new ObjectResponse<User>("User not found", StatusCode.NotFound);

        if (user.Password != password)
            return new ObjectResponse<User>("Incorrect credentials", StatusCode.Unauthorized);

        return new ObjectResponse<User>(user);
    }

    public async Task<ObjectResponse<User>> RegisterAsync(User user)
    {
        var registered = await _userRepository.AddAsync(user);
        if (registered is null)
            return new ObjectResponse<User>("User already exists", StatusCode.Conflict);
        return new ObjectResponse<User>(registered);
    }

    public async Task<VoidResponse> DeleteUserAsync(string id)
    {
        var user = await _userRepository.GetAsync(id);
        if (user is null)
            return new VoidResponse("User not found", StatusCode.NotFound);
        
        bool deleted = await _userRepository.DeleteAsync(user);
        if (!deleted)
            return new VoidResponse("Unknown error deleting user", StatusCode.BadRequest);
        
        return new VoidResponse();
    }

    public async Task<VoidResponse> ChangePasswordAsync(string id, string newPassword)
    {
        var user = await _userRepository.GetAsync(id);
        if (user is null)
            return new VoidResponse("User not found", StatusCode.NotFound);
        
        user.Password = newPassword;
        await _userRepository.UpdateAsync(user);

        return new VoidResponse();
    }

    public async Task<ObjectResponse<float>> UpdateBalanceAsync(string id, float amount)
    {
        var user = await _userRepository.GetAsync(id);

        if (user is not Better better)
            return new ObjectResponse<float>("User is not a better", StatusCode.Unauthorized);
        
        better.Balance += amount;
        if (better.Balance < 0)
            return new ObjectResponse<float>("Insufficient balance", StatusCode.Forbidden);
        
        await _userRepository.UpdateAsync(better);
        return new ObjectResponse<float>(better.Balance);
    }

    public async Task<ObjectResponse<IEnumerable<Transaction>>> GetTransactionHist(string id)
    {
        var user = await _userRepository.GetAsync(id);
        if (user is not Better better)
            return new ObjectResponse<IEnumerable<Transaction>>("User is not a better", StatusCode.Unauthorized);
        var transactionHist = better.TransactionHist;
        if (transactionHist is null)
            return new ObjectResponse<IEnumerable<Transaction>>("Unknown error getting transaction history", StatusCode.BadRequest);
        
        return new ObjectResponse<IEnumerable<Transaction>>(transactionHist);
    }

    public async Task<ObjectResponse<IEnumerable<Notification>>> GetNotificationsAsync(string userId)
    {
        var user = await _userRepository.GetAsync(userId);
        if (user is null)
            return new ObjectResponse<IEnumerable<Notification>>("User not found", StatusCode.NotFound);

        var notifications = user.Notifications;
        if (notifications is null)
            return new ObjectResponse<IEnumerable<Notification>>("Unknown error getting notifications", StatusCode.BadRequest);
        
        return new ObjectResponse<IEnumerable<Notification>>(notifications);
    }

    public async Task<VoidResponse> CloseNotificationAsync(string notificationId)
    {
        var notification = await _notificationRepository.GetAsync(notificationId);
        if (notification is null)
            return new VoidResponse("Notification not found", StatusCode.NotFound);

        bool deleted = await _notificationRepository.DeleteAsync(notification);
        if (!deleted)
            return new VoidResponse("Unknown error cancelling notification", StatusCode.BadRequest);
        
        return new VoidResponse();
    }
}