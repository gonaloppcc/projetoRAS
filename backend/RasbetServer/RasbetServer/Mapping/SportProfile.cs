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