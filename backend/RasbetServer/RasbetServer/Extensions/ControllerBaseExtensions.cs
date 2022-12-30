using Microsoft.AspNetCore.Mvc;
using RasbetServer.Services.Communication;

namespace RasbetServer.Extensions;

public static class ControllerBaseExtensions
{
    public static IActionResult ProcessResponse(this ControllerBase controller, BaseResponse response)
    {
        return response.StatusCode switch
        {
            StatusCode.NotFound => controller.NotFound(response.Message),
            StatusCode.BadRequest => controller.BadRequest(response.Message),
            StatusCode.Forbidden => controller.Forbid(response.Message),
            StatusCode.Unauthorized => controller.Unauthorized(response.Message),
            StatusCode.Conflict => controller.Conflict(response.Message),
            StatusCode.Ok => controller.Ok(),
            _ => throw new ArgumentOutOfRangeException()
        };
    }
}