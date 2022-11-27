using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Football;
using RasbetServer.Models.Events.Sports.Basketball;

namespace RasbetServer.Controllers;

[ApiController]
[Route("events")]
public class EventController : ControllerBase
{
    // TODO: Remove this and obtain events from the database
    private static readonly List<Event> MockEvents = new()
    {
       new FootballEvent("Porto", "Sporting", Competition.PortugueseFirstLeague, DateTime.Now),
       new FootballEvent("Benfica", "Rio Ave", Competition.PortugueseFirstLeague, DateTime.Now),
       new FootballEvent("Barcelona", "PSG", Competition.ChampionsLeague, DateTime.Now),
       new FootballEvent("Liverpool", "Tottenham", Competition.EnglishFirstLeague, DateTime.Now),
       new FootballEvent("Man Utd", "Arsenal", Competition.EnglishFirstLeague, DateTime.Now),
       new FootballEvent("Atlético de Madrid", "Ajax", Competition.EuropaLeague, DateTime.Now),
    };

    private readonly JsonSerializerSettings _settings = new();

    public EventController()
    {
        _settings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
    }

    [HttpGet(Name = "GetPage")]
    public ActionResult<List<Event>> GetPage([FromQuery] Sport sport, [FromQuery] int page)
    {
        if (page*2 >= MockEvents.Count)
            return NoContent();

        List<Event> events = MockEvents;
        if (sport != Sport.All)
            events = MockEvents.FindAll(e => e.GetSport() == sport);
        return Ok(JsonConvert.SerializeObject(events.Skip(2*page).Take(2), _settings));
    }

    [HttpGet("{id:int}")]
    public ActionResult<Event> GetEvent(int id)
    {
        return MockEvents[id];
    }

    [HttpPost(Name = "AddGame")]
    public IActionResult AddEvent([FromQuery] Sport sport, [FromBody] JsonElement json)
    {
        Event newEvent = sport switch
        {
            Sport.Football => FootballEvent.FromJson(json),
            Sport.Basketball => BasketballEvent.FromJson(json),
            _ => throw new ArgumentOutOfRangeException(nameof(sport), sport, null)
        };
        MockEvents.Add(newEvent);
        return Ok(newEvent.ToJson(_settings));
    }
}