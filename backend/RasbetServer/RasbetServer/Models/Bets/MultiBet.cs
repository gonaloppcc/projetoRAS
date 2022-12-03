using System.ComponentModel.DataAnnotations;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets;

public class MultiBet : Bet {
    [Required] public List<Event> Events { get; }

    public MultiBet(
        ulong? id,
        DateTime date,
        bool closed,
        Odd odd,
        float amount,
        IEnumerable<Event> events
    ) : base(id, date, closed, odd, amount) {
        Events = events.ToList();
    }
}