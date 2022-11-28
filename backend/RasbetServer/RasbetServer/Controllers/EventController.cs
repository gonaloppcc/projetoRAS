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
       new FootballEvent(0, 1, 2, DateTime.Now, 0, 1),
       new FootballEvent(1, 3, 4, DateTime.Now, 0, 2),
       new FootballEvent(2, 2, 3, DateTime.Now, 0, 2),
       new FootballEvent(3, 1, 2, DateTime.Now, 2, 2),
       new FootballEvent(4, 1, 3, DateTime.Now, 2, 1),
       new FootballEvent(5, 1, 2, DateTime.Now, 2, 3),
       new BasketballEvent(6, 6, 4, DateTime.Now, 3, 4),
       new BasketballEvent(7, 3, 4, DateTime.Now, 3, 4),
       new BasketballEvent(8, 2, 4, DateTime.Now, 3, 4),
       new MarathonEvent(9, new ulong[]{ 2, 8, 9, 6 }, DateTime.Now, 3, 2),
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