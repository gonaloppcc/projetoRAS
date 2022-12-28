using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    public async Task<ActionResult<Competition>> AddCompetition([FromBody] SaveCompetitionResource competitionResource)
    {
        try
        {
            var comp = _mapper.Map<SaveCompetitionResource, Competition>(competitionResource);
            var newComp = await _competitionService.AddAsync(comp);
            var mapped = _mapper.Map<Competition, CompetitionResource>(newComp);
            return Ok(JsonConvert.SerializeObject(mapped));
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}", Name = "GetCompetition")]
    public async Task<ActionResult<Competition>> GetCompetition(string id)
    {
        var comp = await _competitionService.GetAsync(id);
        var compResource = _mapper.Map<Competition, CompetitionResource>(comp);
        return Ok(JsonConvert.SerializeObject(compResource));   
    }

    [HttpGet(Name = "GetAllCompetitions")]
    public async Task<ActionResult<List<Competition>>> GetAllCompetitions([FromQuery] string sportId)
    {
        var comps = await _competitionService.ListAsync(sportId);
        var compsResource = _mapper.Map<IEnumerable<Competition>, IEnumerable<CompetitionResource>>(comps);
        return Ok(JsonConvert.SerializeObject(compsResource));
    }
}