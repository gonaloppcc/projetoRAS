using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.CompetitionRepository;

namespace RasbetServer.Controllers;

[ApiController]
[Route("competitions")]
public class CompetitionController : ControllerBase
{
    private readonly ICompetitionRepository _competitionRepository;

    public CompetitionController(ICompetitionRepository competitionRepository)
    {
        _competitionRepository = competitionRepository;
    }
    
    [HttpPost(Name = "AddCompetition")]
    public ActionResult<Competition> AddCompetition(JsonElement json)
    {
        var comp = Competition.FromJson(JObject.Parse(json.ToString()));

        var newComp = _competitionRepository.AddCompetition(comp);

        return Ok(JsonConvert.SerializeObject(newComp));
    }

    [HttpGet("{id}", Name = "GetCompetition")]
    public ActionResult<Competition> GetCompetition(string id)
        => Ok(JsonConvert.SerializeObject(_competitionRepository.GetCompetition(id)));

    [HttpGet(Name = "GetAllCompetitions")]
    public ActionResult<List<Competition>> GetAllCompetitions([FromQuery] string sportId)
        => Ok(JsonConvert.SerializeObject(_competitionRepository.GetAllCompetitions(sportId)));
}