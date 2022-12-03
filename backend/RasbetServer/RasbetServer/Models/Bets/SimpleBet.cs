using System.ComponentModel.DataAnnotations;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Bets;

public class SimpleBet : Bet {
    [Required] public Event Event { get; }

    public SimpleBet(
        ulong? id,
        DateTime date,
        bool closed,
        Odd odd,
        float amount,
        Event @event
    ) : base(id, date, closed, odd, amount) {
        Event = @event;
    }
}