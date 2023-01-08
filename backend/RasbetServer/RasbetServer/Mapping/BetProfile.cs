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
        CreateMap<SimpleBet, SimpleBetResource>()
            .ForMember(
                    dest => dest.EventId,
                    opt => opt.MapFrom(
                            src => src.Odd.Event.Id
                        )
                );
        CreateMap<MultiBet, MultiBetResource>()
            .ForMember(
            dest => dest.Odds,
            opt => opt.MapFrom(
                src => src.Odds.ToList().ConvertAll(odd => new OddEventResource { OddId = odd.Id, EventId = odd.Event.Id })
            )
        );

        CreateMap<SaveBetResource, Bet>()
            .IncludeAllDerived();
        CreateMap<SaveSimpleBetResource, SimpleBet>()
            .ForMember(
                    dest => dest.Odd,
                    opt => opt.MapFrom(
                            src => new Odd(src.OddId)
                        )
                );
        CreateMap<SaveMultiBetResource, MultiBet>()
            .ForMember(
                dest => dest.Odds,
                opt => opt.MapFrom(
                    src => src.OddIds.ToList().ConvertAll(id => new Odd(id))
                )
            );
    }
}