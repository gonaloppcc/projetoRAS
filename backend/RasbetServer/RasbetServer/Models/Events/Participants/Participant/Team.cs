using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Linq;

namespace RasbetServer.Models.Events.Participants.Participant;

public class Team : Participant {
    [Required]
    public virtual List<Player> Players { get; set; }

    public Team() : base() { }
    
    public Team(string name, IEnumerable<Player> players) : base(name) {
        Players = players.ToList();
    }

    public static Team FromJson(JObject json)
    {
        string name = json["Name"].Value<string>();
        List<Player> players = new ();

        foreach (var player in json["Players"].Value<JArray>())
        {
            players.Add(Player.FromJson(player.ToObject<JObject>()));
        }

        return new Team(name, players);
    }
}