using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class Result
{
    public ParticipantOdd Participant { get; set; }
    public int? Score { get; set; }

    public Result(ParticipantOdd participant, int? score)
    {
        Participant = participant;
        Score = score;
    }
}