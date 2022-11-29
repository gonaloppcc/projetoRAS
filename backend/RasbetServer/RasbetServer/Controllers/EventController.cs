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
    [HttpGet(Name = "GetPage")]
    public ActionResult<Event> GetPage([FromQuery] int sportId, [FromQuery] int pageNum)
    {
        List<Event> e = new()
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
            )
        };
        return Ok(JsonConvert.SerializeObject(e));
    }
}