namespace RasbetServer.Resources.Events.Sport;

public class SportResource
{
    public string Name { get; set; }
    public virtual IEnumerable<string> Competitions { get; set; }
    public virtual IEnumerable<string> Teams { get; set; }
    public virtual IEnumerable<string> Players { get; set; }
}