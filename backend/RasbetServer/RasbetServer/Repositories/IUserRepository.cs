using RasbetServer.Models.Users;

namespace RasbetServer.Repositories;

public interface IUserRepository {
    User GetUser(string id);
    User LoginUser(string email, string password);
    User AddUser(User user);
    bool ChangePassword(string id, string password);
}