using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class TwoParticipants : IParticipants
{
    public KeyValuePair<ParticipantOdd, int> Home { get; set; }
    public KeyValuePair<ParticipantOdd, int> Away { get; set; }
    public TieOdd? Tie { get; set; }

    public TwoParticipants(ParticipantOdd home, int score1, ParticipantOdd away, int score2)
    {
        Home = new KeyValuePair<ParticipantOdd, int>(home, score1);
        Away = new KeyValuePair<ParticipantOdd, int>(away, score2);
    }

    public List<KeyValuePair<ParticipantOdd, int>> GetParticipants()
    {
        return new List<KeyValuePair<ParticipantOdd, int>> { Home, Away };
    }

    public KeyValuePair<ParticipantOdd, int>? GetWinner()
    {
        if (Home.Value == Away.Value)
            return null;

        return Away;
    }
}