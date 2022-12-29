using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Resources.Bets;
using RasbetServer.Resources.Bets.MultiBet;
using RasbetServer.Resources.Bets.SimpleBet;

namespace RasbetServer.Models.Bets;

public abstract class Bet
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;
    
    [Required]
    public DateTime Date { get; set; }
    
    [Required]
    public bool Closed { get; set; }
    
    [Required] 
    [ForeignKey("BetterId")]
    public string BetterId { get; set; }
    
    [Required]
    public float Amount { get; set; }
    
    public float CancelReturn => 0.8f * Amount;

    public Bet() { }
    
    public Bet(
        DateTime date,
        bool closed,
        string betterId,
        float amount
    ) {
        Date = date;
        Closed = closed;
        BetterId = betterId;
        Amount = amount;
    }

    public abstract float CalcCashOut();

    public abstract IEnumerable<Odd> GetOdds();

    public static SaveBetResource FromJson(JObject json)
    {
        return json["Type"]!.Value<string>() switch
        {
            nameof(MultiBet) => json["Bet"]!.ToObject<SaveMultiBetResource>()!,
            nameof(SimpleBet) => json["Bet"]!.ToObject<SaveSimpleBetResource>()!,
            _ => throw new JsonException()
        };
    }
}