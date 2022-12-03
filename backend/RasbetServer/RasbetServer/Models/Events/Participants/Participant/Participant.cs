namespace RasbetServer.Models.Events.Participants.Participant;

public class Participant
{
    public Participant(string name)
    {
        Name = name;
    }

    public string Name { get; }
}