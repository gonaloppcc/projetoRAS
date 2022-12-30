namespace RasbetServer.Services.Communication;

public abstract class BaseResponse
{
    public bool Success { get; protected set; }
    public string Message { get; protected set; }
    public StatusCode StatusCode { get; protected set; }

    protected BaseResponse(bool success, string msg, StatusCode statusCode)
    {
        Success = success;
        Message = msg;
        StatusCode = statusCode;
    }
}