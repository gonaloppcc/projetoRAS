using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories;

public class BaseRepositiory
{
    protected readonly AppDbContext _context;

    public BaseRepositiory(AppDbContext context)
    {
        _context = context;
    }
}