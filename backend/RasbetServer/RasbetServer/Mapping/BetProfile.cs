using AutoMapper;
using RasbetServer.Models.Bets;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Resources.Bets;
using RasbetServer.Resources.Bets.MultiBet;
using RasbetServer.Resources.Bets.SimpleBet;

namespace RasbetServer.Mapping;

public class BetProfile : Profile
{
    public BetProfile()
    {
        CreateMap<Bet, BetResource>()
            .IncludeAllDerived();
        CreateMap<SimpleBet, SimpleBetResource>();
        CreateMap<MultiBet, MultiBetResource>()
            .ForMember(
            dest => dest.OddIds,
            opt => opt.MapFrom(
                src => src.Odds.ToList().ConvertAll(odd => odd.Id)
            )
        );

        CreateMap<SaveBetResource, Bet>()
            .IncludeAllDerived();
        CreateMap<SaveSimpleBetResource, SimpleBet>();
        CreateMap<SaveMultiBetResource, MultiBet>()
            .ForMember(
                dest => dest.Odds,
                opt => opt.MapFrom(
                    src => src.OddIds.ToList().ConvertAll(id => new Odd(id))
                )
            );
    }
}