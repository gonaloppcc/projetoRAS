using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class Result : ICopyFrom<Result>, IComparable<Result>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;
    
    [Required]
    [ForeignKey("ParticipantOddId")]
    public string? ParticipantId { get; set; } = null;
    public virtual ParticipantOdd Participant { get; set; }
    
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

    public bool Compare(Result other)
    {
        return Score == other.Score && Participant.Compare(other.Participant);
    }
}