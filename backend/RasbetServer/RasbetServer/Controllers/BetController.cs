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
        => Ok(JsonConvert.SerializeObject(_betRepository.GetBet(id)));

    [HttpGet(Name = "GetAllBets")]
    public ActionResult<IEnumerable<Bet>> GetAllBets([FromQuery] string userId)
    {
        try
        {
            var bets = _betRepository.GetBets(userId);
            return Ok(JsonConvert.SerializeObject(bets));
        }
        catch (Exception e)
        {
            return NotFound("Better not found");
        }
    }

    [HttpPost(Name = "AddBet")]
    public ActionResult<Bet> AddBet(JsonElement json)
    {
        var bet = Bet.FromJson(JObject.Parse(json.ToString()));
        return Ok(JsonConvert.SerializeObject(_betRepository.MakeBet(bet)));
    }
}