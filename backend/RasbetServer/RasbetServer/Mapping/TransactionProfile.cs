using AutoMapper;
using RasbetServer.Models.Users.Better;
using RasbetServer.Resources.Users.Better.Transaction;

namespace RasbetServer.Mapping;

public class TransactionProfile : Profile
{
    public TransactionProfile()
    {
        CreateMap<Transaction, TransactionResource>()
            .ForMember(
                dest => dest.Type,
                opt => opt.MapFrom(
                        src => src.Type.ToString()
                    )
                );
    }
}