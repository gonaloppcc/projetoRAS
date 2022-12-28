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
        CreateMap<Odd, OddResource>().IncludeAllDerived();
        CreateMap<ParticipantOdd, ParticipantOddResource>();
        CreateMap<TieOdd, TieOddResource>();
    }
}