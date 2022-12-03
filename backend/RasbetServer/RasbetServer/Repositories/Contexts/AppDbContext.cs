using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Users;

namespace RasbetServer.Repositories.Contexts;

public class AppDbContext : DbContext {
    public DbSet<User> Users { get; set; }
    public DbSet<Better> Betters { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) {
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Better>()
            .HasData(
                new Better("0", "marco@gmail.com", "marco", "marco123", "123456789", "123456789", "123456789", 20,
                    new List<Transaction>()));
    }
}