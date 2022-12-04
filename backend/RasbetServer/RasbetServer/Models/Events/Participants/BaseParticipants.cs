using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RasbetServer.Models.Events.Participants;

public abstract class BaseParticipants
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;

    public BaseParticipants() { }
    
    public abstract List<Result> GetParticipants();
    public abstract Result? GetWinner();
}