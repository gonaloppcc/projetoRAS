namespace RasbetServer.Resources.Events.Event.FootballEvent;

public class FootballEventResource : EventResource
{
    public override string SportId { get; set; } = Models.Events.FootballEvent.Sport;
}