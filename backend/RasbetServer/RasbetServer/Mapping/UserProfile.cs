using AutoMapper;
using RasbetServer.Models.Events;
using RasbetServer.Models.Users;
using RasbetServer.Models.Users.Better;
using RasbetServer.Resources.Users;
using RasbetServer.Resources.Users.Administrator;
using RasbetServer.Resources.Users.Better;
using RasbetServer.Resources.Users.Specialist;

namespace RasbetServer.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserResource>()
            .IncludeAllDerived();
        CreateMap<Better, BetterResource>();
        CreateMap<Administrator, AdministratorResource>();
        CreateMap<Specialist, SpecialistResource>()
            .ForMember(
                dest => dest.Specialties,
                opt => opt.MapFrom(
                    src => src.Specialties.ToList().ConvertAll(spec => spec.Name)
                )
            );

        CreateMap<SaveUserResource, User>()
            .IncludeAllDerived();
        CreateMap<SaveBetterResource, Better>();
        CreateMap<SaveAdministratorResource, Administrator>();
        CreateMap<SaveSpecialistResource, Specialist>()
            .ForMember(
                dest => dest.Specialties,
                opt => opt.MapFrom(
                    src =>
                        src.Specialties.ToList().ConvertAll(spec => new Sport(spec))
                )
            );
    }
}