using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users.Notifications;

public class EventPromotionEndedNotification : Notification
{
    public EventPromotionEndedNotification() : base() {}
    
    public EventPromotionEndedNotification(
        string? id,
        string? betterId,
        string message,
        DateTime date,
        NotificationSeverity severity
    ) : base(id, betterId, message, date, severity)
    { }
    
    public EventPromotionEndedNotification(Event e) 
        : this(null, null, $"Uma promoção para o evento '{e.PrettyName}' acabou", DateTime.Now, NotificationSeverity.Info)
    { }
}