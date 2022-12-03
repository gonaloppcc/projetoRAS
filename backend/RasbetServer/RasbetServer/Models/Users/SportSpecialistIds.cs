using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;

namespace RasbetServer.Models.Users;

public class SportSpecialistIds
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string? Id { get; set; } = null;
    
    [Required]
    public string SpecialistId { get; set; }
    
    [Required]
    public string SportId { get; set; }
    public virtual Sport Sport { get; set; }

    public static SportSpecialistIds FromJson(JObject json)
    {
        string sportId = json[nameof(SportId)].Value<string>();

        return new SportSpecialistIds { SportId = sportId };
    }
}