namespace RasbetServer.Services.Communication;

public class ObjectResponse<T> : BaseResponse
{
    public T? Object { get; protected set; }
    
    private ObjectResponse(bool success, string msg, StatusCode statusCode, T? obj) : base(success, msg, statusCode)
    {
        Object = obj;
    }
    
    public ObjectResponse(T obj) : this(true, string.Empty, StatusCode.Ok, obj)
    { }
    
    public ObjectResponse(string msg, StatusCode statusCode) : this(false, msg, statusCode, default)
    { }
}