using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Users.Better;
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
    public virtual Better Better { get; set; }
    
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

    private static string? GetTypeFromJObject(JObject json) 
        => (json["Type"] ?? json["type"])?.Value<string>();

    private static JToken? GetBetTokenFromJObject(JObject json) 
        => json["Bet"] ?? json["bet"];
    
    public static SaveBetResource? FromJson(JObject json)
    {
        return GetTypeFromJObject(json) switch
        {
            nameof(MultiBet) => GetBetTokenFromJObject(json)?.ToObject<SaveMultiBetResource>(),
            nameof(SimpleBet) => GetBetTokenFromJObject(json)?.ToObject<SaveSimpleBetResource>(),
            _ => throw new JsonException()
        };
    }
}