using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RasbetServer.Extensions;
using RasbetServer.Models.Events;
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
        var sport = _mapper.Map<SaveSportResource, Sport>(sportResource);
        var response = await _sportService.AddAsync(sport);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Sport, SportResource>(response.Object!));
    }

    [HttpGet("{id}", Name = "GetSport")]
    public async Task<IActionResult> GetSport(string id)
    {
        var response = await _sportService.GetAsync(id);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Sport, SportResource>(response.Object!));
    }

    [HttpGet(Name = "GetAllSports")]
    public async Task<IActionResult> GetAllSports()
    {
        var response = await _sportService.ListAsync();
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<IEnumerable<Sport>, IEnumerable<SportResource>>(response.Object!));
    }

    [HttpDelete("{id}", Name = "Delete Sport")]
    public async Task<IActionResult> DeleteSport(string id)
    {
        var response = await _sportService.DeleteAsync(id);
        if (!response.Success)
            return this.ProcessResponse(response);

        return Ok("Sport successfully deleted");
    }
}