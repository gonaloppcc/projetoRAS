using RasbetServer.Models.Users;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.UserRepository;

public class UserRepository : BaseRepository, IUserRepository {
    public UserRepository(AppDbContext context) : base(context) {
    }

    public User GetUser(string id) {
        return (from u in _context.Users where u.Id == id select u).Single();
    }

    public User LoginUser(string email, string password) {
        return (from u in _context.Users where u.Email == email & u.Password == password select u).Single();
    }

    public User AddUser(User user) {
        var newUser = _context.Users.Add(user);
        _context.SaveChanges();

        return newUser.Entity;
    }

    public bool ChangePassword(string id, string password) {
        throw new NotImplementedException();
    }
}