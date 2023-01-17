using AutoMapper;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Resources.Odds;
using RasbetServer.Resources.Odds.ParticipantOdds;
using RasbetServer.Resources.Odds.TieOdds;

namespace RasbetServer.Mapping;

public class OddProfile : Profile
{
    public OddProfile()
    {
        CreateMap<Odd, OddResource>()
            .IncludeAllDerived();
        CreateMap<TieOdd, TieOddResource>()
            .ConstructUsing(o => new TieOddResource(o));
        CreateMap<ParticipantOdd, ParticipantOddResource>()
            .ConstructUsing(o => new ParticipantOddResource(o));

        CreateMap<SaveOddResource, OddResource>()
            .IncludeAllDerived();
        CreateMap<SaveParticipantOddResource, ParticipantOdd>();
        CreateMap<SaveTieOddResource, TieOdd>();
    }
}