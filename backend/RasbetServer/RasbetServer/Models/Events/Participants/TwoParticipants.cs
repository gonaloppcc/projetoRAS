using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class TwoParticipants : IParticipants
{
    public Result Home { get; set; }
    public Result Away { get; set; }
    public TieOdd? Tie { get; set; }

    public TwoParticipants(ParticipantOdd home, int score1, ParticipantOdd away, int score2)
    {
        Home = new Result(home, score1);
        Away = new Result(away, score2);
    }

    public List<Result> GetParticipants() 
        => new() { Home, Away };

    public Result? GetWinner()
        => Home.Score != Away.Score ? Home : null;
}