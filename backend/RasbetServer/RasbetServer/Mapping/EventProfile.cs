using AutoMapper;
using RasbetServer.Models.Events;
using RasbetServer.Resources.Events.Event;
using RasbetServer.Resources.Events.Event.FootballEvent;

namespace RasbetServer.Mapping;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<Event, EventResource>()
            .ForMember(
                    dest => dest.Competition,
                    opt => opt.MapFrom(
                            src => src.Competition.Name
                        )
                ).IncludeAllDerived();
        CreateMap<FootballEvent, FootballEventResource>();

        CreateMap<SaveFootballEventResource, FootballEvent>();
    }
}