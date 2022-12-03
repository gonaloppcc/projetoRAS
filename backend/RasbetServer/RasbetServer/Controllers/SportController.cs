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
            return Ok(JsonConvert.SerializeObject(_sportRepository.AddSport(sport)));
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
            return Ok(JsonConvert.SerializeObject(_sportRepository.GetSport(id)));
        }
        catch (Exception e)
        {
            return NotFound();
        }
    }

    [HttpGet(Name = "GetAllSports")]
    public ActionResult<List<Sport>> GetAllSports()
    {
        try
        { 
            return Ok(JsonConvert.SerializeObject(_sportRepository.GetAllSports()));
        }
        catch (Exception e)
        {
            return NotFound();
        }
    }
}