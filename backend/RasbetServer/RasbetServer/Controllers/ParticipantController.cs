using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Resources.Events.Event.Participants.Participant;
using RasbetServer.Resources.Events.Event.Participants.Participant.Player;
using RasbetServer.Resources.Events.Event.Participants.Participant.Team;
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
        var participant = await _ParticipantService.GetAsync(id);
        return Ok(_mapper.Map<Participant, ParticipantResource>(participant));
    }

    [HttpGet(Name = "GetBySport")]
    public async Task<IActionResult> GetBySportAsync([FromQuery] string sport)
    {
        var partList = await _ParticipantService.ListBySportAsync(sport);
        return Ok(_mapper.Map<IEnumerable<Participant>, IEnumerable<ParticipantResource>>(partList));
    }

    [HttpPost("teams", Name = "AddTeam")]
    public async Task<IActionResult> AddTeamAsync(SaveTeamResource teamResource)
    {
        var part = _mapper.Map<SaveTeamResource, Team>(teamResource);
        var added = await _ParticipantService.AddAsync(part);
        return Ok(_mapper.Map<Participant, ParticipantResource>(added));
    }
    
    [HttpPost("players", Name = "AddPlayer")]
    public async Task<IActionResult> AddPlayerAsync(SavePlayerResource playerResource)
    {
        var part = _mapper.Map<SavePlayerResource, Player>(playerResource);
        var added = await _ParticipantService.AddAsync(part);
        return Ok(_mapper.Map<Participant, ParticipantResource>(added));
    }
}