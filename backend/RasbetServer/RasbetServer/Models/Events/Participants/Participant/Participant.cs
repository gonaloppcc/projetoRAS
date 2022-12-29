using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Events.Participants.Participant;

[Index(nameof(Name), IsUnique = true)]
public abstract class Participant
{
    [Key]
    [MaxLength(30)]
    public string Name { get; set; }
    
    [Required]
    public string SportId { get; set; }

    public Participant() { }
    
    public Participant(string name, string sportId)
    {
        Name = name;
        SportId = sportId;
    }

    public static Participant FromJson(JObject json)
    {
        return json["Type"].Value<string>() switch
        {
            "Team" => FromJson(json),
            "Player" => FromJson(json),
            _ => throw new JsonException()
        };
    }
}