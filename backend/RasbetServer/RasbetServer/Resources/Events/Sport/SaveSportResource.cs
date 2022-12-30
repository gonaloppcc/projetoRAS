using System.ComponentModel.DataAnnotations;

namespace RasbetServer.Resources.Events.Sport;

public class SaveSportResource
{
    [Required] public string Name { get; set; }
    [Required] public IEnumerable<string> Competitions { get; set; }
}