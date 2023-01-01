using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.CompareResults;

namespace RasbetServer.Models.Events.Participants;

public abstract class BaseParticipants : ICopyFrom<BaseParticipants>, IComparable<BaseParticipants, IEnumerable<EventCompareResults>?>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;

    public BaseParticipants() { }
    
    public abstract List<Result> GetParticipants();
    public abstract Result? GetWinner();
    public abstract void CopyFrom(BaseParticipants other);
    public abstract IEnumerable<EventCompareResults>? Compare(BaseParticipants other);
}