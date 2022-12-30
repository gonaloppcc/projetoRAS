using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Users.Notifications;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.Repositories.NotificationRepository;

public class NotificationRepository : BaseRepository, INotificationRepository
{
    public NotificationRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<Notification?> AddAsync(Notification notification)
    {
        try
        {
            var entityEntry = await _context.Notifications.AddAsync(notification);
            await _context.SaveChangesAsync();

            await entityEntry.ReloadAsync();
            return entityEntry.Entity;
        }
        catch (DbUpdateException)
        {
            return null;
        }
    }

    public async Task<Notification?> GetAsync(string id)
    {
        return await (
            from n in _context.Notifications
            where n.Id == id
            select n
        ).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Notification>?> ListAsync(string userId)
    {
        return await (
            from n in _context.Notifications
            where n.UserId == userId
            select n
        ).ToListAsync();
    }

    public async Task<bool> DeleteAsync(Notification notification)
    {
        try
        {
            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }
}