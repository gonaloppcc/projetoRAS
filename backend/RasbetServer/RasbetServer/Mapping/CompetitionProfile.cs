using AutoMapper;
using RasbetServer.Models.Events;
using RasbetServer.Resources.Events.Competitions;

namespace RasbetServer.Mapping;

public class CompetitionProfile : Profile
{
    public CompetitionProfile()
    {
        CreateMap<Competition, CompetitionResource>();
        CreateMap<SaveCompetitionResource, Competition>();
    }
}