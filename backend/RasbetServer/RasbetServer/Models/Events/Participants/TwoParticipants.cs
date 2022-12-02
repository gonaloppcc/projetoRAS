using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class TwoParticipants : IParticipants {
    [Required] public Result Home { get; set; }
    [Required] public Result Away { get; set; }
    public TieOdd? Tie { get; set; }

    public TwoParticipants(ParticipantOdd home, int homeScore, ParticipantOdd away, int awayScore) {
        Home = new Result(home, homeScore);
        Away = new Result(away, awayScore);
    }

    public List<Result> GetParticipants()
        => new() { Home, Away };

    public Result? GetWinner() {
        if (Home.Score == Away.Score)
            return null;

        return Home.Score > Away.Score ? Home : Away;
    }
}