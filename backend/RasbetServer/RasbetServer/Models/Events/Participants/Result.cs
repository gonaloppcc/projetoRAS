using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class Result
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)] public string? Id { get; set; } = null;
    [Required] [ForeignKey("ParticipantOddId")] public string? ParticipantId { get; set; } = null;
    public ParticipantOdd Participant { get; set; }
    [Required] public int? Score { get; set; }

    public Result() { }
    
    public Result(ParticipantOdd? participant, int? score)
    {
        Participant = participant;
        Score = score;
    }
}