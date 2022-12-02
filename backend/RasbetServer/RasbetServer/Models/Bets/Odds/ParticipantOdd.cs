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

    public override bool HasWon()
    {
        throw new NotImplementedException();
    }

    public override string GetName() => Part.Name;
}