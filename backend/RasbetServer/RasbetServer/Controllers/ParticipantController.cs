using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RasbetServer.Extensions;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Resources.Events.Participants.Participant;
using RasbetServer.Resources.Events.Participants.Participant.Player;
using RasbetServer.Resources.Events.Participants.Participant.Team;
using RasbetServer.Services.Participants;

namespace RasbetServer.Controllers;

[ApiController]
[Route("participants")]
public class ParticipantController : ControllerBase
{
    private readonly IParticipantService _ParticipantService;
    private readonly IMapper _mapper;

    public ParticipantController(IParticipantService participantService, IMapper mapper)
    {
        _ParticipantService = participantService;
        _mapper = mapper;
    }

    [HttpGet("{id}", Name = "GetParticipant")]
    public async Task<IActionResult> GetParticipantAsync(string id)
    {
        var response = await _ParticipantService.GetAsync(id);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Participant, ParticipantResource>(response.Object!));
    }

    [HttpGet(Name = "GetBySport")]
    public async Task<IActionResult> GetBySportAsync([FromQuery] string sport)
    {
        var response = await _ParticipantService.ListBySportAsync(sport);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<IEnumerable<Participant>, IEnumerable<ParticipantResource>>(response.Object!));
    }

    [HttpPost("teams", Name = "AddTeam")]
    public async Task<IActionResult> AddTeamAsync(SaveTeamResource teamResource)
    {
        var part = _mapper.Map<SaveTeamResource, Team>(teamResource);
        var response = await _ParticipantService.AddAsync(part);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Participant, ParticipantResource>(response.Object!));
    }
    
    [HttpPost("players", Name = "AddPlayer")]
    public async Task<IActionResult> AddPlayerAsync(SavePlayerResource playerResource)
    {
        var part = _mapper.Map<SavePlayerResource, Player>(playerResource);
        var response = await _ParticipantService.AddAsync(part);
        if (!response.Success)
            return this.ProcessResponse(response);
        
        return Ok(_mapper.Map<Participant, ParticipantResource>(response.Object!));
    }
}