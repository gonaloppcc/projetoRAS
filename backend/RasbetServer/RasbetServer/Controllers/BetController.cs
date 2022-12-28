using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets;
using RasbetServer.Resources.Bets;
using RasbetServer.Services.Bets;

namespace RasbetServer.Controllers;

[ApiController]
[Route("bets")]
public class BetController : ControllerBase
{
    private readonly IBetService _betService;
    private readonly IMapper _mapper;

    public BetController(IBetService betService, IMapper mapper)
    {
        _betService = betService;
        _mapper = mapper;
    }

    [HttpGet("{id}", Name = "GetBet")]
    public async Task<ActionResult<Bet>> GetBet(string id)
    {
        var bet = await _betService.GetAsync(id);
        return Ok(_mapper.Map<Bet, BetResource>(bet));
    }

    [HttpGet(Name = "GetAllBets")]
    public async Task<ActionResult<IEnumerable<Bet>>> GetAllBets([FromQuery] string userId)
    {
        var betList = await _betService.ListAsync(userId); 
        return Ok(_mapper.Map<IEnumerable<Bet>, IEnumerable<BetResource>>(betList));
    }

    [HttpPost(Name = "AddBet")]
    public async Task<ActionResult<Bet>> AddBet([FromBody] JObject json)
    {
        var betResource = Bet.FromJson(json);
        var bet = _mapper.Map<SaveBetResource, Bet>(betResource);
        var newBet = await _betService.AddAsync(bet);
        return Ok(_mapper.Map<Bet, BetResource>(newBet));
    }

    [HttpDelete("{id}", Name = "DeleteBet")]
    public async Task<IActionResult> CancelBet(string id)
    {
        return Ok(await _betService.CancelBetAsync(id));
    }
}