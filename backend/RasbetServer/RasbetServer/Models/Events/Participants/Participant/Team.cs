using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Models.Events.Participants.Participant;

public class Team : Participant {
    [Required] public List<Player> Players { get; }

    public Team(string name, IEnumerable<Player> players) : base(name) {
        Players = players.ToList();
    }
}