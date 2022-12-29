namespace RasbetServer.Services.Communication;

public class VoidResponse : BaseResponse
{
    private VoidResponse(bool success, string msg, StatusCode statusCode) : base(success, msg, statusCode)
    { }
    
    public VoidResponse() : this(true, string.Empty, StatusCode.Ok)
    { }
    
    public VoidResponse(string msg, StatusCode statusCode) : this(false, msg, statusCode)
    { }
}