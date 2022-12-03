using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Events;

public class Sport
{
    [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)] public string? Id { get; set; } = null;
    [Required]
    [MaxLength(40)]
    public string Name { get; set; }

    public Sport(string name)
    {
        Name = name;
    }
    
    public static Sport FromJson(JObject json)
        => new Sport(json[nameof(Name)].Value<string>());
}