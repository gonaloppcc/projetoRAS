using System.ComponentModel.DataAnnotations;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Bets;

public abstract class Bet {
    [Key] public ulong? Id { get; }
    [Required] public DateTime Date { get; }
    [Required] public bool Closed { get; }
    [Required] public Odd Target { get; }
    [Required] public float Amount { get; }

    public Bet(
        ulong? id,
        DateTime date,
        bool closed,
        Odd odd,
        float amount
    ) {
        Id = id;
        Date = date;
        Closed = closed;
        Target = odd;
        Amount = amount;
    }

    public float CalcCashOut()
        => Amount * Target.Price;
}