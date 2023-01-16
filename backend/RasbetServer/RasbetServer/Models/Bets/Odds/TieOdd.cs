using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.CompareResults;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;

namespace RasbetServer.Models.Bets.Odds;

public class TieOdd : Odd
{
    [InverseProperty("Tie")]
    public virtual TwoParticipants Participants { get; set; }

    public override Event Event => Participants.Event;

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

    public static TieOdd? FromJson(JObject? json)
    {
        if (json is null)
            return null;
        float price = json[nameof(Price)].Value<float>();
        Promotion? promotion = Promotion.FromJson(json[nameof(Promo)].ToObject<JObject>());

        return new TieOdd(price, promotion);
    }
}