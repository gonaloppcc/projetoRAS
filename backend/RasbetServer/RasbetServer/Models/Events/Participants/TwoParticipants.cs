using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class TwoParticipants : IParticipants
{
    public Result Home { get; set; }
    public Result Away { get; set; }
    public TieOdd? Tie { get; set; }

    public TwoParticipants(ParticipantOdd home, int homeScore, ParticipantOdd away, int awayScore)
    {
        Home = new Result(home, homeScore);
        Away = new Result(away, awayScore);
    }

    public List<Result> GetParticipants() 
        => new() { Home, Away };

    public Result? GetWinner()
        => Home.Score != Away.Score ? Home : null;
}