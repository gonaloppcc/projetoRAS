using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Resources.Events.Sport;
using RasbetServer.Services.Sports;

namespace RasbetServer.Controllers;

[ApiController]
[Route("sports")]
public class SportController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ISportService _sportService;

    public SportController(ISportService sportService, IMapper mapper)
    {
        _sportService = sportService;
        _mapper = mapper;
    }
    
    [HttpPost(Name = "AddSport")]
    public async Task<IActionResult> AddSport([FromBody] SaveSportResource sportResource)
    {
        try
        {
            var sport = _mapper.Map<SaveSportResource, Sport>(sportResource);
            var added = await _sportService.AddAsync(sport);
            var response = _mapper.Map<Sport, SportResource>(added);
            return Ok(JsonConvert.SerializeObject(response));
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}", Name = "GetSport")]
    public async Task<ActionResult<SportResource>> GetSport(string id)
    {
        try
        {
            var sportResource = _mapper.Map<Sport, SportResource>(await _sportService.GetAsync(id));
            return Ok(sportResource);
        }
        catch (Exception e)
        {
            return NotFound();
        }
    }

    [HttpGet(Name = "GetAllSports")]
    public async Task<ActionResult<IEnumerable<SportResource>>> GetAllSports()
    {
        try
        {
            var sports = await _sportService.ListAsync();
            var sportsResources = _mapper.Map<IEnumerable<Sport>, IEnumerable<SportResource>>(sports);
            return Ok(sportsResources);
        }
        catch (Exception e)
        {
            return NotFound();
        }
    }
}