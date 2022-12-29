namespace RasbetServer.Models.Events.Participants.Participant;

public class Team : Participant
{
    public virtual IList<Player> Players { get; set; }

    public Team() : base() { }
    
    public Team(string name, string sportId, IEnumerable<Player> players) : base(name, sportId) {
        Players = players.ToList();
    }
}