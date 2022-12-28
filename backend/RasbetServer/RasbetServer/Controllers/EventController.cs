using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Resources.Events.Event;
using RasbetServer.Services.Events;

namespace RasbetServer.Controllers;

// TODO: Implement proper error handling
[ApiController]
[Route("events")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;
    private readonly IMapper _mapper;

    public EventController(IEventService eventService, IMapper mapper)
    {
        _eventService = eventService;
        _mapper = mapper;
    }

    // TODO: Implement this properly
    [HttpGet(Name = "GetPage")]
    public async Task<ActionResult<List<EventResource>>> GetPage([FromQuery] string compId, [FromQuery] int pageNum,
        [FromQuery] int pageSize)
    {
        var page = await _eventService.ListPageAsync(compId, pageNum, pageSize); 
        return Ok(_mapper.Map<IEnumerable<Event>, IEnumerable<EventResource>>(page));
    }

    // TODO: Implement this properly
    [HttpGet("{id}", Name = "GetEvent")]
    public async Task<ActionResult<Event>> GetEvent(string id)
    {
        try
        {
            var e = await _eventService.GetAsync(id);
            return Ok(_mapper.Map<Event, EventResource>(e));
        }
        catch (Exception exception)
        {
            return NotFound("The requested event was not found");
        }
    }

    // TODO: Implement this properly
    [HttpPost(Name = "AddEvent")]
    public async Task<IActionResult> AddEvent([FromBody] JsonElement json)
    {
        try
        {
            var e = Event.FromJson(JObject.Parse(json.ToString()));
            var newEvent = await _eventService.AddAsync(e);
            return Ok(_mapper.Map<Event,EventResource>(newEvent));
        }
        catch (Exception exception)
        {
            return BadRequest("Error Adding Event");
        }
    }
}
