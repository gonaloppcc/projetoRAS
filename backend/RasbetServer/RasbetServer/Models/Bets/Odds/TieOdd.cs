using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets.Odds;

public class TieOdd : Odd
{
    public TieOdd() : base() { }
    
    public TieOdd(string id, float price, Promotion? promo) : base(id, price, promo)
    { }
    
    public TieOdd(float price, Promotion? promo) : base(price, promo)
    { }

    public override bool HasWon(Event @event)
    {
        var results = @event.Participants.GetParticipants();
        int? highestScore = 0;
        int? sndHighestScore = 0;

        foreach (var result in results)
        {
            if (result.Score >= highestScore)
            {
                sndHighestScore = highestScore;
                highestScore = result.Score;
            }
        }

        // If the second highest score is the same as the highest then it's a tie.
        return highestScore == sndHighestScore;
    }

    public override string GetName()
        => "Tie";
}