namespace RasbetServer.Models;

public interface IComparable<in T, out TChangedEnum>
{
    TChangedEnum Compare(T other);
}