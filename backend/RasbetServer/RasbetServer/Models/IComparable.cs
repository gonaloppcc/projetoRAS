namespace RasbetServer.Models;

public interface IComparable<in T>
{
    bool Compare(T other);
}