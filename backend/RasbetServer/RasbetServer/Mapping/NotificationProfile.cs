using AutoMapper;
using Microsoft.OpenApi.Extensions;
using RasbetServer.Models.Users.Notifications;
using RasbetServer.Resources.Users.Notifications;

namespace RasbetServer.Mapping;

public class NotificationProfile : Profile
{
    public NotificationProfile()
    {
        CreateMap<Notification, NotificationResource>()
            .ForMember(
                dest => dest.Severity,
                opt => opt.MapFrom(
                    src => src.Severity.GetDisplayName()
                )
            )
            .IncludeAllDerived();
        CreateMap<EventCompletedNotification, NotificationResource>();
        CreateMap<EventDateChangedNotification, NotificationResource>();
        CreateMap<EventOddPriceChangedNotification, NotificationResource>();
        CreateMap<EventPromotionCreatedNotification, NotificationResource>();
        CreateMap<EventPromotionEndedNotification, NotificationResource>();
        CreateMap<EventPromotionValueChangedNotification, NotificationResource>();
    }
}