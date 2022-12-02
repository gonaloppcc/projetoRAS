using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;

namespace RasbetServer.Models.Bets.Odds;

public class ParticipantOdd : Odd
{
    public Participant Part;

    public ParticipantOdd(
        ulong? id,
        float price,
        Participant part,
        Promotion? promo
    ) : base(id, price, promo)
    {
        Part = part;
    }

    public override bool HasWon(Event @event)
    {
        var results = @event.Participants.GetParticipants();
        Result highestScore = results[0];
        Result sndHighestScore = results[0];

        foreach (var result in results.Skip(1))
        {
            if (result.Score > highestScore.Score)
            {
                sndHighestScore = highestScore;
                highestScore = result;
            }
        }

        // If the second highest score is equal to the highest score then it's a tie and we lost the bet
        if (sndHighestScore.Score == highestScore.Score)
            return false;
        
        // If the name of the highest score participant is the
        // same as this instance's participant's name then we won!
        return highestScore.Participant.Part.Name == Part.Name;
    }

    public override string GetName() => Part.Name;
}