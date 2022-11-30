using RasbetServer.Models.Users;

namespace RasbetServer.Repositories;

public interface IBetterRepository
{
    Better GetBetter(ulong id);
    Better LoginBetter(string email, string password);
    void AddBetter(Better b);
    bool ChangePassword(ulong id, string password);
}