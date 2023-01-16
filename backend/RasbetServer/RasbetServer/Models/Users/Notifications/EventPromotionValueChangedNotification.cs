using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users.Notifications;

public class EventPromotionValueChangedNotification : Notification
{
    public EventPromotionValueChangedNotification() : base() {}
    
    public EventPromotionValueChangedNotification(
        string? id,
        string? betterId,
        string message,
        DateTime date,
        NotificationSeverity severity) 
        : base(id, betterId, message, date, severity)
    { }
    
    public EventPromotionValueChangedNotification(Event e)
        : this(null, null, $"A promotion for event '{e.PrettyName}' has changed value", DateTime.Now, NotificationSeverity.Info)
    { }
}