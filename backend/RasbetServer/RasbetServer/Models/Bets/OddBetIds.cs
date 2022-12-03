using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;

namespace RasbetServer.Models.Bets;

public class OddBetIds
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;

    [ForeignKey("OddId")]
    public string OddId { get; set; }
    public virtual Odd Odd { get; set; }
    
    [ForeignKey("BetId")] public string? MultiBetId { get; set; } = null;

    public static OddBetIds FromJson(JObject json)
    {
        string oddId = json[nameof(OddId)].Value<string>();

        return new OddBetIds { OddId = oddId };
    }
}