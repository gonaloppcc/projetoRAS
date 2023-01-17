using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Resources.Odds.ParticipantOdds;

public class ParticipantOddResource : OddResource
{
    public override string Type => "ParticipantOdd";

    public string ParticipantName { get; set; }

    public ParticipantOddResource(ParticipantOdd odd) : base(odd)
    {
        ParticipantName = odd.PartId;
    }
}