using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Events;

[Index(nameof(Name), IsUnique = true)]
public class Competition
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;

    [Required]
    [MaxLength(40)]
    public string Name { get; set; }

    [Required]
    [ForeignKey("SportId")]
    public string SportId { get; set; }
    public virtual Sport Sport { get; set; }

    public Competition(string name, string sportId)
    {
        Name = name;
        SportId = sportId;
    }

    public static Competition FromJson(JObject json)
    {
        string name = json[nameof(Name)].Value<string>();
        string sportId = json[nameof(SportId)].Value<string>();

        return new Competition(name, sportId);
    }
}