using RasbetServer.Models.Users;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories;

public class BetterRepository : BaseRepositiory, IBetterRepository
{
    public BetterRepository(AppDbContext context) : base(context)
    {
    }

    public Better GetBetter(ulong id)
    {
        return (from b in _context.Betters where b.Id == id select b).Single();
    }

    public Better LoginBetter(string email, string password)
    {
        return (from b in _context.Betters where b.Email == email & b.Password == password select b).Single();
    }

    public void AddBetter(Better b)
    {
        _context.Betters.Add(b);
        foreach (Transaction t in b.TransactionHist)
            _context.Transactions.Add(t);
        _context.SaveChanges();
    }

    public bool ChangePassword(ulong id, string password)
    {
        var better = (from b in _context.Betters where b.Id == id select b).Single();
        better.Password = password;
        _context.SaveChanges();

        return true;
    }
}