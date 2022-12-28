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
            .IncludeAllDerived();
        CreateMap<FootballEvent, FootballEventResource>();
    }
}