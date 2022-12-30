using RasbetServer.Models.Users.Notifications;

namespace RasbetServer.Repositories.NotificationRepository;

public interface INotificationRepository
{
    Task<Notification?> AddAsync(Notification notification);
    Task<Notification?> GetAsync(string id);
    Task<IEnumerable<Notification>?> ListAsync(string userId);
    Task<bool> DeleteAsync(Notification notification);
}