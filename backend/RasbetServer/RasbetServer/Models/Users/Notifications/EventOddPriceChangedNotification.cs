using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users.Notifications;

public class EventOddPriceChangedNotification : Notification
{
    public EventOddPriceChangedNotification() : base() {}
    
    public EventOddPriceChangedNotification(
        string? id,
        string? betterId,
        string message, 
        DateTime date,
        NotificationSeverity severity)
        : base(id, betterId, message, date, severity)
    { }

    public EventOddPriceChangedNotification(Event e)
        : this(null, null, $"A cota das odds do evento '{e.PrettyName}' mudaram", DateTime.Now, NotificationSeverity.Low)
    { }
}