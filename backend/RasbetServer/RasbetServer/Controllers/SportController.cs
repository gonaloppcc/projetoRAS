using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Events;
using RasbetServer.Repositories.SportRepository;

namespace RasbetServer.Controllers;

[ApiController]
[Route("sports")]
public class SportController : ControllerBase
{
    private readonly ISportRepository _sportRepository;

    public SportController(ISportRepository sportRepository)
    {
        _sportRepository = sportRepository;
    }
    [HttpPost(Name = "AddSport")]
    public IActionResult AddSport([FromBody] JsonElement json)
    {
        try
        {
            var sport = Sport.FromJson(JObject.Parse(json.ToString()));
            var newSport = _sportRepository.AddSport(sport);

            return Ok(JsonConvert.SerializeObject(newSport));
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}", Name = "GetSport")]
    public ActionResult<Sport> GetSport(string id)
    {
        try
        {
            var sport = _sportRepository.GetSport(id);
            return Ok(JsonConvert.SerializeObject(sport));
        }
        catch (Exception e)
        {
            return NotFound();
        }
    }

    [HttpGet(Name = "GetAllSports")]
    public ActionResult<List<Sport>> GetAllSports()
        => Ok(JsonConvert.SerializeObject(_sportRepository.GetAllSports()));
}