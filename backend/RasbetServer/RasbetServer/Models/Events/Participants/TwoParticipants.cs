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
    
    public TwoParticipants(ParticipantOdd home, int homeScore, ParticipantOdd away, int awayScore, TieOdd? tie) {
        Home = new Result(home, homeScore);
        Away = new Result(away, awayScore);
        Tie = tie;
    }

    public override List<Result> GetParticipants()
        => new() { Home, Away };

    public override Result? GetWinner() {
        if (Home.Score == Away.Score)
            return null;

        return Home.Score > Away.Score ? Home : Away;
    }

    public static TwoParticipants FromJson(JObject json)
    {
        ParticipantOdd home = ParticipantOdd.FromJson(json[nameof(Home)].ToObject<JObject>());
        ParticipantOdd away = ParticipantOdd.FromJson(json[nameof(Away)].ToObject<JObject>());
        TieOdd? tieOdd = TieOdd.FromJson(json[nameof(Tie)].ToObject<JObject>());

        return new TwoParticipants(home, 0, away, 0, tieOdd);
    }
}