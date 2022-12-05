using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;

namespace RasbetServer.Models.Bets.Odds;

public class ParticipantOdd : Odd
{
    [Required] [ForeignKey("PartId")] public string PartId { get; set; }
    [Required] public virtual Participant Part { get; set; }

    public ParticipantOdd() : base() { }
    
    public ParticipantOdd(
        string id,
        float price, 
        string partId,
        Promotion? promo
    ) : base(id, price, promo)
    {
        PartId = partId;
    }
    
    public ParticipantOdd(
        float price,
        Participant part,
        Promotion? promo
    ) : base(price, promo)
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
            if (result.Score >= highestScore.Score)
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

    public static ParticipantOdd FromJson(JObject json)
    {
        float price = json["Price"].Value<float>();
        Participant participant = Participant.FromJson(json["Participant"].ToObject<JObject>());
        Promotion? promotion = Promotion.FromJson(json["Promotion"].ToObject<JObject>());

        return new ParticipantOdd(price, participant, promotion);
    }
}