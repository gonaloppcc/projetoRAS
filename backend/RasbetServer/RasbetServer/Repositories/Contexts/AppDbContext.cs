using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Users;

namespace RasbetServer.Repositories.Contexts;

public class AppDbContext : DbContext
{
    public DbSet<Better> Betters { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) 
        : base(options) 
    { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Better>().ToTable("Users");
        builder.Entity<Better>().HasKey(u => u.Id);
        builder.Entity<Better>().Property(p => p.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Better>().Property(p => p.Email).IsRequired().HasMaxLength(30);
        builder.Entity<Better>().Property(p => p.Username).IsRequired().HasMaxLength(30);
        builder.Entity<Better>().Property(p => p.Password).IsRequired().HasMaxLength(30);
        builder.Entity<Better>().Property(p => p.Nif).IsRequired().HasColumnType("char(9)");
        builder.Entity<Better>().Property(p => p.Cc).IsRequired().HasColumnType("char(8)");
        builder.Entity<Better>().Property(p => p.Cellphone).IsRequired().HasMaxLength(30);
        builder.Entity<Better>().Property(p => p.Balance).IsRequired();
        builder.Entity<Better>().HasMany(b => b.TransactionHist)
            .WithOne(t => t.Better)
            .HasForeignKey(t => t.BetterId);

        builder.Entity<Better>().HasData(
            new Better(1, "marco@email.com", "Marquinho", "Pass1", "Nif", "CC", "123456789", 32.21f,
                new List<Transaction>())
        );

        builder.Entity<Transaction>().ToTable("Transactions");
        builder.Entity<Transaction>().HasKey(t => t.Id);
        builder.Entity<Transaction>().Property(t => t.Id).IsRequired().ValueGeneratedOnAdd();
        builder.Entity<Transaction>().Property(t => t.Value).IsRequired();
    }
}