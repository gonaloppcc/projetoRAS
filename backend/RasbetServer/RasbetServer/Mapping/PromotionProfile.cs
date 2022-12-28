using AutoMapper;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Resources.Promotions;

namespace RasbetServer.Mapping;

public class PromotionProfile : Profile
{
    public PromotionProfile()
    {
        CreateMap<Promotion, PromotionResource>();
        CreateMap<SavePromotionResource, Promotion>();
    }
}