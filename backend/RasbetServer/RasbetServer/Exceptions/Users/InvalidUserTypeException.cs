namespace RasbetServer.Exceptions.Users;

public class InvalidUserTypeException : Exception
{
    public InvalidUserTypeException() : base()
    { }
    public InvalidUserTypeException(string msg) : base(msg)
    { }
    public InvalidUserTypeException(string msg, Exception inner) : base(msg, inner)
    { }
}