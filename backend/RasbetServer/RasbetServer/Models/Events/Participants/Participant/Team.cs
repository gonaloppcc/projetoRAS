namespace RasbetServer.Models.Events.Participants.Participant;

public class Team : Participant
{
    public Team(string name, IEnumerable<Player> players) : base(name)
    {
        Players = players.ToList();
    }

    public List<Player> Players { get; }
}