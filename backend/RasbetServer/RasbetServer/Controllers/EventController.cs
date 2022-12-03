using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories;
using RasbetServer.Repositories.EventRepository;

namespace RasbetServer.Controllers;

[ApiController]
[Route("events")]
public class EventController : ControllerBase
{
    private readonly IEventRepository _eventRepository;
    
    public EventController(IEventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }
    
    // TODO: Implement this properly
    [HttpGet(Name = "GetPage")]
    public ActionResult<List<Event>> GetPage([FromQuery] string sportId, [FromQuery] int pageNum, [FromQuery] int pageSize)
    {
        var eventList = _eventRepository.GetPage(sportId, pageNum, pageSize);
        
        return Ok(JsonConvert.SerializeObject(eventList));
    }

    // TODO: Implement this properly
    [HttpGet("{id}", Name = "GetEvent")]
    public ActionResult<Event> GetEvent(string id)
    {
        try
        {
            var e = _eventRepository.GetEvent(id);
            return Ok(JsonConvert.SerializeObject(e));
        }
        catch (Exception exception)
        {
            return NotFound("The requested event was not found");
        }
    }

    // TODO: Implement this properly
    [HttpPost(Name = "AddEvent")]
    public IActionResult AddEvent([FromQuery] string sportId, [FromBody] JsonElement json)
    {
        try
        {
            var e = FootballEvent.FromJson(JObject.Parse(json.ToString()));

            var newEvent = _eventRepository.AddEvent(e);
            return Ok(JsonConvert.SerializeObject(newEvent));
        }
        catch (Exception exception)
        {
            return BadRequest("Error Adding Event");
        }
    }
}