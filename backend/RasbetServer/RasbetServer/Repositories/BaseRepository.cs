using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories;

public class BaseRepository {
    protected readonly AppDbContext Context;

    public BaseRepository(AppDbContext context) {
        Context = context;
    }
}