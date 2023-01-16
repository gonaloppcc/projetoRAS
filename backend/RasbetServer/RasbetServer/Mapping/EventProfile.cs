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
                            src => src.CompetitionId
                        )
                ).IncludeAllDerived();
        CreateMap<FootballEvent, FootballEventResource>();

        CreateMap<SaveEventResource, Event>()
            .IncludeAllDerived();
        CreateMap<SaveFootballEventResource, FootballEvent>();
    }
}