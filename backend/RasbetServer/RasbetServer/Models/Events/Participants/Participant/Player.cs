using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Events.Participants.Participant;

public class Player : Participant
{
    [ForeignKey("TeamId")] public string? TeamId { get; set; }
    //public Team? Team { get; set; }
    
    public Player() : base() {}
    
    public Player(string name) : base(name)
    {
    }

    public static Player FromJson(JObject json)
        => new Player(json["Name"].Value<string>());
}