using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.EventRepository;

namespace RasbetServer.Controllers;

// TODO: Implement proper error handling
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
        try
        {
            return Ok(JsonConvert.SerializeObject(_eventRepository.GetPage(sportId, pageNum, pageSize)));
        }
        catch (Exception e)
        {
            return NotFound("Page not found");
        }
    }

    // TODO: Implement this properly
    [HttpGet("{id}", Name = "GetEvent")]
    public ActionResult<Event> GetEvent(string id)
    {
        try
        {
            return Ok(JsonConvert.SerializeObject(_eventRepository.GetEvent(id)));
        }
        catch (Exception exception)
        {
            return NotFound("The requested event was not found");
        }
    }

    // TODO: Implement this properly
    [HttpPost(Name = "AddEvent")]
    public IActionResult AddEvent([FromBody] JsonElement json)
    {
        try
        {
            var e = FootballEvent.FromJson(JObject.Parse(json.ToString()));
            return Ok(JsonConvert.SerializeObject(_eventRepository.AddEvent(e)));
        }
        catch (Exception exception)
        {
            return BadRequest("Error Adding Event");
        }
    }
}