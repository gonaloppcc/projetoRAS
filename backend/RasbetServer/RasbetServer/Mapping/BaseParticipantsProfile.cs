using AutoMapper;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Resources.Events.Event.BaseParticipants;

namespace RasbetServer.Mapping;

public class BaseParticipantsProfile : Profile
{
    public BaseParticipantsProfile()
    {
        CreateMap<BaseParticipants, BaseParticipantsResource>()
            .IncludeAllDerived();
        CreateMap<TwoParticipants, TwoParticipantsResource>();
        CreateMap<Result, ResultResource>();
    }
}