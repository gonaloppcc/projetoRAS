using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;

namespace RasbetServer.Controllers;

[ApiController]
[Route("events")]
public class EventController : ControllerBase
{
    private List<Event> MockEvents = new()
        {
            new FootballEvent(
                0,
                new TwoParticipants(
                    new ParticipantOdd(0, 2.3f, new Player("Porto"), null),
                    3,
                    new ParticipantOdd(1, 1.3f, new Player("Benfica"), null)
                    , 2
                    ),
                DateTime.Now,
                "Primeira Liga Portuguesa",
                false
            ),
            new FootballEvent(
                1,
                new TwoParticipants(
                    new ParticipantOdd(0, 2.3f, new Player("Trofense"), null),
                    3,
                    new ParticipantOdd(1, 1.3f, new Player("Santo Tirso"), null)
                    , 2
                    ),
                DateTime.Now,
                "Primeira Liga Portuguesa",
                false
            ),
            new FootballEvent(
                2,
                new TwoParticipants(
                    new ParticipantOdd(0, 2.3f, new Player("Guimarães"), null),
                    3,
                    new ParticipantOdd(1, 1.3f, new Player("Boavista"), null)
                    , 2
                    ),
                DateTime.Now,
                "Primeira Liga Portuguesa",
                false
            ),
            new FootballEvent(
                3,
                new TwoParticipants(
                    new ParticipantOdd(0, 2.3f, new Player("Sporting"), null),
                    3,
                    new ParticipantOdd(1, 1.3f, new Player("Braga"), null)
                    , 2
                    ),
                DateTime.Now,
                "Primeira Liga Portuguesa",
                false
            )
        };
    
    // TODO: Implement this properly
    [HttpGet(Name = "GetPage")]
    public ActionResult<List<Event>> GetPage([FromQuery] int sportId, [FromQuery] int pageNum)
    {
        var page = MockEvents.Skip(pageNum * 2).Take(2).ToList();
        return Ok(JsonConvert.SerializeObject(page));
    }

    // TODO: Implement this properly
    [HttpGet("{id:int}", Name = "GetEvent")]
    public ActionResult<Event> GetEvent(int id)
    {
        var e = MockEvents[id];
        return Ok(JsonConvert.SerializeObject(e));
    }

    // TODO: Implement this properly
    public IActionResult AddEvent([FromQuery] int sportId, JsonElement json)
    {
        return Ok("Event added successfully");
    }
}