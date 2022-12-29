using AutoMapper;
using RasbetServer.Models.Users;
using RasbetServer.Resources.Users.Better.Transaction;

namespace RasbetServer.Mapping;

public class TransactionProfile : Profile
{
    public TransactionProfile()
    {
        CreateMap<Transaction, TransactionResource>();
    }
}