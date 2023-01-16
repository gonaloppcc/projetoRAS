namespace RasbetServer.Models;

public interface ICopyFrom<in T>
{
    void CopyFrom(T other);
}