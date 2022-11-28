using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Sports;
using RasbetServer.Models.Events.Sports.Basketball;
using RasbetServer.Models.Events.Sports.Football;
using RasbetServer.Models.Events.Sports.Marathon;

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
       new BasketballEvent("Bayton Bobcats", "East Houston Utd", Competition.NationalBasketballLeague, DateTime.Now),
       new BasketballEvent("Pasadena Storm", "Lake Houston Flight", Competition.NationalBasketballLeague, DateTime.Now),
       new BasketballEvent("Houston Hurricanes", "Galveston Islanders", Competition.NationalBasketballLeague, DateTime.Now),
       new MarathonEvent(new []{ "António Fernands", "Miguel Amaro", "Ricardo Santos", "Miguel Fonseca" },  Competition.FunchalMarathon, DateTime.Now),
    };

    private readonly JsonSerializerSettings _settings = new();

    public EventController()
    {
        _settings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
    }

    [HttpGet(Name = "GetPage")]
    public ActionResult<List<Event>> GetPage([FromQuery] Sport sport, [FromQuery] int pageNum)
    {
        var events = MockEvents;
        if (sport != Sport.All)
            events = MockEvents.FindAll(e => e.GetSport() == sport);
        var page = events.Skip(2 * pageNum).Take(2);
        
        if (pageNum*2 >= page.Count())
            return NoContent();
        return Ok(JsonConvert.SerializeObject(page, _settings));
    }

    [HttpGet("{id:int}", Name = "GetEvent")]
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
            Sport.Marathon => MarathonEvent.FromJson(json),
            _ => throw new ArgumentOutOfRangeException(nameof(sport), sport, null)
        };
        MockEvents.Add(newEvent);
        return Ok(newEvent.ToJson(_settings));
    }
}