using AutoMapper;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Resources.Odds;
using RasbetServer.Resources.Odds.ParticipantOdd;
using RasbetServer.Resources.Odds.TieOdd;

namespace RasbetServer.Mapping;

public class OddProfile : Profile
{
    public OddProfile()
    {
        CreateMap<Odd, OddResource>()
            .IncludeAllDerived();
        CreateMap<TieOdd, TieOddResource>();
        CreateMap<ParticipantOdd, ParticipantOddResource>()
            .ForMember(
                    dest => dest.ParticipantName,
                    opt => opt.MapFrom(
                            src => src.PartId
                        )
                );

        CreateMap<SaveOddResource, OddResource>()
            .IncludeAllDerived();
        CreateMap<SaveParticipantOddResource, ParticipantOdd>();
        CreateMap<SaveTieOddResource, TieOdd>();
    }
}