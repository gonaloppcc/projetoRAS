using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public abstract class BaseParticipants : ICopyFrom<BaseParticipants>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;
    
    [InverseProperty("Participants")]
    public virtual Event Event { get; set; }

    [InverseProperty("Participants")]
    public virtual IList<Result> Results { get; set; } = new List<Result>(); 

    public BaseParticipants() { }
    
    public abstract List<Result> GetParticipants();
    public abstract Result? GetWinner();
    public abstract void CopyFrom(BaseParticipants other);
}