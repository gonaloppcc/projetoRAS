using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RasbetServer.Extensions;
using RasbetServer.Models.Events;
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

    [HttpGet("competition", Name = "GetPageByCompetition")]
    public async Task<IActionResult> GetPageByCompetition([FromQuery] string compId, [FromQuery] int pageNum, [FromQuery] int pageSize)
    {
        var response = await _eventService.ListPageByCompetitionAsync(compId, pageNum, pageSize);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<IEnumerable<Event>, IEnumerable<EventResource>>(response.Object!));
    }

    [HttpGet("sport", Name = "GetPageBySport")]
    public async Task<IActionResult> GetPageBySport([FromQuery] string sportId, [FromQuery] int pageNum, [FromQuery] int pageSize)
    {
        var response = await _eventService.ListPageBySportAsync(sportId, pageNum, pageSize);
        if (!response.Success)
            return this.ProcessResponse(response);

        return Ok(_mapper.Map<IEnumerable<Event>, IEnumerable<EventResource>>(response.Object!));
    }

    [HttpGet("{id}", Name = "GetEvent")]
    public async Task<IActionResult> GetEvent(string id)
    {
        var response = await _eventService.GetAsync(id);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Event, EventResource>(response.Object!));
    }

    [HttpPost(Name = "AddEvent")]
    public async Task<IActionResult> AddEvent([FromBody] JObject json)
    {
        var eventResource = Event.FromJson(json);
        if (eventResource is null)
            return BadRequest("Request is not in a valid format");
        
        var e = _mapper.Map<SaveEventResource, Event>(eventResource);
        var response = await _eventService.AddAsync(e);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Event,EventResource>(response.Object!));
    }

    [HttpPut("{id}", Name = "UpdateEvent")]
    public async Task<IActionResult> UpdateEvent(string id, [FromBody] JObject json)
    {
        var eventResource = Event.FromJson(json);
        if (eventResource is null)
            return BadRequest("Request is not in a valid format");

        var e = _mapper.Map<SaveEventResource, Event>(eventResource);
        var response = await _eventService.UpdateAsync(id, e);
        if (!response.Success)
            return this.ProcessResponse(response);

        return Ok(_mapper.Map<Event, EventResource>(response.Object!));
    }

    [HttpPost("apiCache", Name = "APICache")]
    public async Task<IActionResult> CacheEvents([FromBody] IList<JObject> jsons)
    {
        var events = jsons.Select(Event.FromJson)
            .Where(ser => ser is not null)
            .Select(eventResource => _mapper.Map<SaveEventResource, Event>(eventResource!))
            .ToList();

        var response = await _eventService.CacheEvents(events);
        if (!response.Success)
            return this.ProcessResponse(response);

        return Ok(_mapper.Map<IEnumerable<Event>, IEnumerable<EventResource>>(response.Object!));
    }
}
