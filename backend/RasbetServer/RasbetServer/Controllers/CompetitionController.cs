using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RasbetServer.Extensions;
using RasbetServer.Models.Events;
using RasbetServer.Resources.Events.Competitions;
using RasbetServer.Services.Competitions;

namespace RasbetServer.Controllers;

[ApiController]
[Route("competitions")]
public class CompetitionController : ControllerBase
{
    private readonly ICompetitionService _competitionService;
    private readonly IMapper _mapper;

    public CompetitionController(ICompetitionService competitionService, IMapper mapper)
    {
        _competitionService = competitionService;
        _mapper = mapper;
    }
    
    [HttpPost(Name = "AddCompetition")]
    public async Task<IActionResult> AddCompetition([FromBody] SaveCompetitionResource competitionResource)
    {
        var comp = _mapper.Map<SaveCompetitionResource, Competition>(competitionResource);
        var response = await _competitionService.AddAsync(comp);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Competition, CompetitionResource>(response.Object!));
    }

    [HttpGet("{id}", Name = "GetCompetition")]
    public async Task<IActionResult> GetCompetition(string id)
    {
        var response = await _competitionService.GetAsync(id);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Competition, CompetitionResource>(response.Object!));   
    }

    [HttpGet(Name = "GetAllCompetitions")]
    public async Task<IActionResult> GetAllCompetitions([FromQuery] string sportId)
    {
        var response = await _competitionService.ListAsync(sportId);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<IEnumerable<Competition>, IEnumerable<CompetitionResource>>(response.Object!));
    }

    [HttpDelete("{id}", Name = "DeleteCompetition")]
    public async Task<IActionResult> DeleteCompetition(string id)
    {
        var response = await _competitionService.DeleteAsync(id);
        if (!response.Success)
            return this.ProcessResponse(response);

        return Ok("Competition successfully deleted");
    }
}