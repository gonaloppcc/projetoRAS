using System.ComponentModel.DataAnnotations.Schema;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.CompareResults;

namespace RasbetServer.Models.Events.Participants;

public class TwoParticipants : BaseParticipants
{
    [NotMapped]
    public Result Home
    {
        get => Results.ToList().Find(r => r.Position == 0);
        set
        {
            value.Position = 0;
            Results.Add(value);
        }
    }

    [NotMapped]
    public Result Away
    {
        get => Results.ToList().Find(r => r.Position == 1);
        set
        {
            value.Position = 1;
            Results.Add(value);
        }
    }

    [ForeignKey("TieId")] 
    public string? TieId { get; set; } = null;
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

    public override void CopyFrom(BaseParticipants other)
    {
        if (other is not TwoParticipants twoParticipants)
            throw new InvalidOperationException("Cannot copy BaseParticipants into TwoParticipants");
        
        Home.CopyFrom(twoParticipants.Home);
        Away.CopyFrom(twoParticipants.Away);
        if (Tie is not null && twoParticipants.Tie is not null)
            Tie.CopyFrom(twoParticipants.Tie);
    }

    public override IEnumerable<EventCompareResults>? Compare(BaseParticipants other)
    {
        if (other is not TwoParticipants twoParticipants)
            return null;

        var homeResult = Home.Compare(twoParticipants.Home);
        var awayResult = Away.Compare(twoParticipants.Away);
        var tieResult = new List<EventCompareResults>();
        
        if (Tie is not null && twoParticipants.Tie is not null)
        {
            tieResult = Tie.Compare(twoParticipants.Tie).ToList();
        }

        return homeResult.Concat(awayResult).Concat(tieResult);
    }
}