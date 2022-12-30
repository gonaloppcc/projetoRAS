using AutoMapper;
using RasbetServer.Models.Events;
using RasbetServer.Resources.Events.Sport;

namespace RasbetServer.Mapping;

public class SportProfile : Profile
{
    public SportProfile()
    {
        CreateMap<Sport, SportResource>()
            .ForMember(
                dest => dest.Competitions, 
                opt 
                    => opt.MapFrom(
                            src =>
                                src.Competitions
                                    .ToList()
                                    .ConvertAll(comp => comp.Name)
                                )
                    )
            .ForMember(
                    dest => dest.Teams,
                    opt => opt.MapFrom(
                            src => src.Teams.ToList().ConvertAll(t => t.Name)
                        )
                )
            .ForMember(
                    dest => dest.Players,
                    opt => opt.MapFrom(
                            src => src.Players.ToList().ConvertAll(p => p.Name)
                        )
                );
        
        CreateMap<SaveSportResource, Sport>()
            .ForMember(
                dest => dest.Competitions, 
                opt 
                    => opt.MapFrom(
                        src => 
                            src.Competitions
                                .ToList()
                                .ConvertAll(name => new Competition(name, src.Name))));
    }
}