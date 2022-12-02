using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories;

public class BaseRepository {
    protected readonly AppDbContext _context;

    public BaseRepository(AppDbContext context) {
        _context = context;
    }
}