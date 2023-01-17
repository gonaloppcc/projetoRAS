using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users.Notifications;

public class EventCompletedNotification : Notification
{
    public EventCompletedNotification() : base() {}
    
    public EventCompletedNotification(
        string? id,
        string? betterId,
        string message,
        DateTime date,
        NotificationSeverity severity
    ) : base(id, betterId, message, date, severity)
    { }

    public EventCompletedNotification(Event e)
        : this(null, null, $"O evento '{e.PrettyName}' acabou", DateTime.Now, NotificationSeverity.Info) 
    { }
}