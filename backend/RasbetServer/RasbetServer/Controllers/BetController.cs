using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using RasbetServer.Extensions;
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
    public async Task<IActionResult> GetBet(string id)
    {
        var response = await _betService.GetAsync(id);
        if (!response.Success)
            return this.ProcessResponse(response);
        return Ok(_mapper.Map<Bet, BetResource>(response.Object!));
    }

    [HttpGet(Name = "GetAllBets")]
    public async Task<IActionResult> GetAllBets([FromQuery] string userId)
    {
        var response = await _betService.ListAsync(userId);
        if (!response.Success)
            return this.ProcessResponse(response);
        return Ok(_mapper.Map<IEnumerable<Bet>, IEnumerable<BetResource>>(response.Object!));
    }

    [HttpPost(Name = "AddBet")]
    public async Task<IActionResult> AddBet([FromBody] JObject json)
    {
        var betResource = Bet.FromJson(json);
        if (betResource is null)
            return BadRequest("Request is in an invalid format");
        
        var bet = _mapper.Map<SaveBetResource, Bet>(betResource);
        var response = await _betService.AddAsync(bet);
        if (!response.Success)
            return this.ProcessResponse(response);
        return Ok(_mapper.Map<Bet, BetResource>(response.Object!));
    }

    [HttpDelete("{id}", Name = "DeleteBet")]
    public async Task<IActionResult> CancelBet(string id)
    {
        var response = await _betService.CancelBetAsync(id);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(response.Object);
    }
}