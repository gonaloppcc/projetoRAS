using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets;
using RasbetServer.Repositories.BetRepository;

namespace RasbetServer.Controllers;

[ApiController]
[Route("bets")]
public class BetController : ControllerBase
{
    private readonly IBetRepository _betRepository;

    public BetController(IBetRepository betRepository)
    {
        _betRepository = betRepository;
    }

    [HttpGet("{id}", Name = "GetBet")]
    public ActionResult<Bet> GetBet(string id)
    {
        try
        {
            return Ok(JsonConvert.SerializeObject(_betRepository.GetBet(id)));
        }
        catch (Exception e)
        {
            return BadRequest();
        } 
    }

    [HttpGet(Name = "GetAllBets")]
    public ActionResult<IEnumerable<Bet>> GetAllBets([FromQuery] string userId)
    {
        try
        {
            return Ok(JsonConvert.SerializeObject(_betRepository.GetBets(userId)));
        }
        catch (Exception e)
        {
            return NotFound("Better not found");
        }
    }

    [HttpPost(Name = "AddBet")]
    public ActionResult<Bet> AddBet(JsonElement json)
    {
        try
        {
            var bet = Bet.FromJson(JObject.Parse(json.ToString()));
            return Ok(JsonConvert.SerializeObject(_betRepository.MakeBet(bet)));
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }
}