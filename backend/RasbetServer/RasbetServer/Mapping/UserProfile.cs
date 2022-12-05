using AutoMapper;
using RasbetServer.Models.Users;
using RasbetServer.Resources.Users;

namespace RasbetServer.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserResource>()
            .Include<Better, BetterResource>()
            .Include<Specialist, SpecialistResource>()
            .Include<Administrator, AdministratorResource>();
        CreateMap<Better, BetterResource>();
        CreateMap<Specialist, SpecialistResource>();
        CreateMap<Administrator, AdministratorResource>();
    }
}