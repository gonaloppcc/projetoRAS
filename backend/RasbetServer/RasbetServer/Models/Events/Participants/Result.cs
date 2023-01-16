using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.CompareResults;

namespace RasbetServer.Models.Events.Participants;

public class Result : ICopyFrom<Result>, IComparable<Result, IEnumerable<EventCompareResults>>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; }
    
    [Required]
    [ForeignKey("ParticipantOddId")]
    public string? ParticipantId { get; set; }
    public virtual ParticipantOdd Participant { get; set; }
    
    [Required]
    [ForeignKey("ParticipantsId")]
    public string? ParticipantsId { get; set; }
    public virtual BaseParticipants Participants { get; set; }
    
    public int? Score { get; set; }

    public Result() { }
    
    public Result(ParticipantOdd? participant, int? score)
    {
        Participant = participant;
        Score = score;
    }

    public void CopyFrom(Result other)
    {
        Score = other.Score;
        Participant.CopyFrom(other.Participant);
    }

    public IEnumerable<EventCompareResults> Compare(Result other)
    {
        return Participant.Compare(other.Participant).Distinct();
    }
}