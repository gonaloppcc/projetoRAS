using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users.Notifications;

public class EventDateChangedNotification : Notification
{
    public EventDateChangedNotification() : base() {}
    
    public EventDateChangedNotification(
        string? id,
        string? betterId,
        string message,
        DateTime date,
        NotificationSeverity severity
    ) : base(id, betterId, message, date, severity)
    { }
    
    public EventDateChangedNotification(Event e)
        : this(null, null, $"O evento '{e.PrettyName}' teve a sua data alterada para {e.Date:dd/MM/yy hh:mm}", DateTime.Now, NotificationSeverity.Low)
    { }
}