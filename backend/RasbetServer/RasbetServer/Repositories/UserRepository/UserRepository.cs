using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Users;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.UserRepository;

public class UserRepository : BaseRepository, IUserRepository {
    public UserRepository(AppDbContext context) : base(context) {
    }

    public User GetUser(string id)
        => (from u in _context.Users where u.Id == id select u).Single();

    public User LoginUser(string email, string password)
        => (from u in _context.Users where u.Email == email & u.Password == password select u).Single();

    public User AddUser(User user) {
        var newUser = _context.Users.Add(user);
        _context.SaveChanges();

        // Refresh _context cache
        newUser.State = EntityState.Detached;
        return _context.Users.Find(newUser.Entity.Id) 
               ?? throw new InvalidOperationException();
    }

    public void DeleteUser(string id)
    {
        var user = (from u in _context.Users where u.Id == id select u).Single();
        _context.Users.Remove(user);
        _context.SaveChanges();
    }

    public void ChangePassword(string id, string password)
    {
        var user = (from u in _context.Users where u.Id == id select u).Single();
        user.Password = password;
        _context.SaveChanges();
    }
}