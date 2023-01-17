using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users.Notifications;

public class EventPromotionCreatedNotification : Notification
{
    public EventPromotionCreatedNotification() : base() {}
    
    public EventPromotionCreatedNotification(
        string? id,
        string? betterId,
        string message, 
        DateTime date,
        NotificationSeverity severity
    ) : base(id, betterId, message, date, severity)
    { }
    
    public EventPromotionCreatedNotification(Event e)
        : this(null, null, $"Event '{e.PrettyName}' has a new promotion", DateTime.Now, NotificationSeverity.Info)
    { }
}