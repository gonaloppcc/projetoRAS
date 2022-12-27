namespace RasbetServer.Exceptions.Users;

public class IncorrectCredentialsException : Exception
{
    public IncorrectCredentialsException() : base()
    { }
    public IncorrectCredentialsException(string msg) : base(msg)
    { }
    public IncorrectCredentialsException(string msg, Exception inner) : base(msg, inner)
    { }
}