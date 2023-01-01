using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.CompareResults;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users.Notifications;

public class Notification
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; }
    
    [Required]
    [ForeignKey("UserId")]
    public string? UserId { get; set; }
    
    [Required]
    [MaxLength(256)]
    public string Message { get; set; }
    
    [Required]
    public DateTime Date { get; set; }
    
    [Required]
    public NotificationSeverity Severity { get; set; }

    public Notification Clone => new Notification(Id, UserId, Message, Date, Severity);
    
    public Notification() {}
    
    protected Notification(string? id, string? userId, string message, DateTime date, NotificationSeverity severity)
    {
        Id = id;
        UserId = userId;
        Message = message;
        Date = date;
        Severity = severity;
    }

    public static IEnumerable<Notification> CreateNotificationFromEventChanges(Event e, IEnumerable<EventCompareResults> changes)
    {
        var notifications = new List<Notification>();

        foreach (var change in changes)
        {
            if (change is EventCompareResults.NothingChanged)
                continue;

            Notification notification = change switch
            {
                EventCompareResults.DateChanged => new EventDateChangedNotification(e),
                EventCompareResults.EventCompleted => new EventCompletedNotification(e),
                EventCompareResults.OddPriceChanged => new EventOddPriceChangedNotification(e),
                EventCompareResults.PromotionCreated => new EventPromotionCreatedNotification(e),
                EventCompareResults.PromotionEnded => new EventPromotionEndedNotification(e),
                EventCompareResults.PromotionValueChanged => new EventPromotionValueChangedNotification(e),
                _ => throw new ArgumentOutOfRangeException()
            };
            
            notifications.Add(notification);
        }

        return notifications;
    }
}