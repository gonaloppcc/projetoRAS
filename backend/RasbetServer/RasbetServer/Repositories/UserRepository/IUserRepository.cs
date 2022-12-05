using RasbetServer.Models.Users;

namespace RasbetServer.Repositories.UserRepository;

public interface IUserRepository {
    User GetUser(string id);
    User LoginUser(string email, string password);
    User AddUser(User user);
    void DeleteUser(string id);
    void ChangePassword(string id, string password);
}