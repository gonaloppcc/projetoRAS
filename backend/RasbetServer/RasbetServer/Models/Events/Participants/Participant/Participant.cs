using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

    public Participant() { }
    
    public Participant(string name)
    {
        Name = name;
    }

    public static Participant FromJson(JObject json)
    {
        return json["Type"].Value<string>() switch
        {
            "Team" => Team.FromJson(json),
            "Player" => Player.FromJson(json),
            _ => throw new JsonException()
        };
    }
}