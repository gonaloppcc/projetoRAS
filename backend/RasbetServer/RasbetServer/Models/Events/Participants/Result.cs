using System.ComponentModel.DataAnnotations;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class Result {
    [Required] public ParticipantOdd Participant { get; set; }
    [Required] public int? Score { get; set; }

    public Result(ParticipantOdd participant, int? score) {
        Participant = participant;
        Score = score;
    }
}