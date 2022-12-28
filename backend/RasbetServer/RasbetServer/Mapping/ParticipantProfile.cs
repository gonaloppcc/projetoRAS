using AutoMapper;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Resources.Events.Participants.Participant;
using RasbetServer.Resources.Events.Participants.Participant.Player;
using RasbetServer.Resources.Events.Participants.Participant.Team;

namespace RasbetServer.Mapping;

public class ParticipantProfile : Profile
{
    public ParticipantProfile()
    {
        CreateMap<Participant, ParticipantResource>()
            .Include<Player, PlayerResource>()
            .Include<Team, TeamResource>();
        CreateMap<Player, PlayerResource>();
        CreateMap<Team, TeamResource>()
            .ForMember(
                dest => dest.Players, 
                opt => opt.MapFrom(
                    src => src.Players.ToList().ConvertAll(player => player.Name)
                )
            );
        
        CreateMap<SaveParticipantResource, Participant>()
            .Include<SavePlayerResource, Player>()
            .Include<SaveTeamResource, Team>();
        CreateMap<SavePlayerResource, Player>();
        CreateMap<SaveTeamResource, Team>()
            .ConstructUsing(src => new Team())
            .ForMember(
                dest => dest.Players,
                opt => opt.MapFrom(
                    src =>
                        src.Players.ToList().ConvertAll(player => new Player(player, src.SportId, src.Name))
                )
            );
    }
}