using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RasbetServer.Models.Users.Notifications;

public class Notification
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; }
    
    [Required]
    [ForeignKey("UserId")]
    public string UserId { get; set; }
    
    [Required]
    [MaxLength(256)]
    public string Message { get; set; }
    
    [Required]
    public NotificationSeverity Severity { get; set; }

    public Notification(string? id, string userId, string message, NotificationSeverity severity)
    {
        Id = id;
        UserId = userId;
        Message = message;
        Severity = severity;
    }
}