using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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

    public static Bet FromJson(JObject json)
    {
        return json["Type"].Value<string>() switch
        {
            nameof(MultiBet) => MultiBet.FromJson(json),
            nameof(SimpleBet) => SimpleBet.FromJson(json),
            _ => throw new JsonException()
        };
    }
}