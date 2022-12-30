using AutoMapper;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Resources.Events.Event.BaseParticipants;
using RasbetServer.Resources.Events.Event.BaseParticipants.Result;
using RasbetServer.Resources.Events.Event.BaseParticipants.TwoParticipants;

namespace RasbetServer.Mapping;

public class BaseParticipantsProfile : Profile
{
    public BaseParticipantsProfile()
    {
        CreateMap<BaseParticipants, BaseParticipantsResource>()
            .IncludeAllDerived();
        CreateMap<TwoParticipants, TwoParticipantsResource>();
        CreateMap<Result, ResultResource>();

        CreateMap<SaveBaseParticipantsResource, BaseParticipants>()
            .IncludeAllDerived();
        CreateMap<SaveResultResource, Result>();
        CreateMap<SaveTwoParticipantsResource, TwoParticipants>();
    }
}