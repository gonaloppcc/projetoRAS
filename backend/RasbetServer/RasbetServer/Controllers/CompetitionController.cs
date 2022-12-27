using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Resources.Events.Competitions;

namespace RasbetServer.Controllers;

[ApiController]
[Route("competitions")]
public class CompetitionController : ControllerBase
{
    private readonly ICompetitionRepository _competitionRepository;
    private readonly IMapper _mapper;

    public CompetitionController(ICompetitionRepository competitionRepository, IMapper mapper)
    {
        _competitionRepository = competitionRepository;
        _mapper = mapper;
    }
    
    [HttpPost(Name = "AddCompetition")]
    public ActionResult<Competition> AddCompetition([FromBody] SaveCompetitionResource competitionResource)
    {
        try
        {
            var comp = _mapper.Map<SaveCompetitionResource, Competition>(competitionResource);
            var newComp = _competitionRepository.AddCompetition(comp);
            var mapped = _mapper.Map<Competition, CompetitionResource>(newComp);
            return Ok(JsonConvert.SerializeObject(mapped));
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}", Name = "GetCompetition")]
    public ActionResult<Competition> GetCompetition(string id)
    {
        var comp = _competitionRepository.GetCompetition(id);
        var compResource = _mapper.Map<Competition, CompetitionResource>(comp);
        return Ok(JsonConvert.SerializeObject(compResource));   
    }

    [HttpGet(Name = "GetAllCompetitions")]
    public ActionResult<List<Competition>> GetAllCompetitions([FromQuery] string sportId)
    {
        var comps = _competitionRepository.GetAllCompetitions(sportId);
        var compsResource = _mapper.Map<IEnumerable<Competition>, IEnumerable<CompetitionResource>>(comps);
        return Ok(JsonConvert.SerializeObject(compsResource));
    }
}