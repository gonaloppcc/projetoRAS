namespace RasbetServer.Exceptions.Users;

public class UserAlreadyExistsException : Exception
{
    
    public UserAlreadyExistsException() : base()
    { }
    public UserAlreadyExistsException(string msg) : base(msg)
    { }
    public UserAlreadyExistsException(string msg, Exception inner) : base(msg, inner)
    { }
}