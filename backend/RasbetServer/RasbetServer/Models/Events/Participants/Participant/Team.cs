namespace RasbetServer.Models.Events.Participants.Participant;

public class Team : Participant
{
    public Team(string name, IEnumerable<string> players) : base(name)
    {
        Players = players.ToList();
    }

    public List<string> Players { get; }
}