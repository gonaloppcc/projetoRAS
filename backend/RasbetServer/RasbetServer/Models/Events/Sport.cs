using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Models.Users;

namespace RasbetServer.Models.Events;

[Index(nameof(Name), IsUnique = true)]
public class Sport
{
    [Key]
    [MaxLength(40)]
    public string Name { get; set; }
    
    [Required]
    [InverseProperty("Sport")]
    public virtual IEnumerable<Competition> Competitions { get; set; }
    public virtual IEnumerable<Specialist> Specialists { get; set; }
    public virtual IEnumerable<Player> Players { get; set; }
    public virtual IEnumerable<Team> Teams { get; set; }

    public Sport(string name)
    {
        Name = name;
        Competitions = new List<Competition>();
    }
    
    public static Sport FromJson(JObject json)
        => new Sport(json[nameof(Name)].Value<string>());
}