using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Events.Participants;

public class TwoParticipants : BaseParticipants
{
    [Required]
    [ForeignKey("HomeId")]
    public string? HomeId { get; set; } = null;
    public virtual Result Home { get; set; }

    [Required]
    [ForeignKey("AwayId")]
    public string? AwayId { get; set; } = null;
    public virtual Result Away { get; set; }

    [ForeignKey("TieId")] public string? TieId { get; set; } = null;
    public virtual TieOdd? Tie { get; set; }

    public TwoParticipants() : base() { }

    public TwoParticipants(Result home, Result away, TieOdd? tie)
    {
        Home = home;
        Away = away;
        Tie = tie;
    }

    public override List<Result> GetParticipants()
        => new() { Home, Away };

    public override Result? GetWinner() {
        if (Home.Score == Away.Score)
            return null;

        return Home.Score > Away.Score ? Home : Away;
    }
}