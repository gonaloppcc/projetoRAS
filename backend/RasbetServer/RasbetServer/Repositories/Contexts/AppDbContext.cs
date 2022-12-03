using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Bets;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Models.Users;

namespace RasbetServer.Repositories.Contexts;

public class AppDbContext : DbContext {
    public DbSet<User> Users { get; set; }
    public DbSet<Better> Betters { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    
    public DbSet<Event> Events { get; set; }
    public DbSet<FootballEvent> FootballEvents { get; set; }
    public DbSet<Competition> Competitions { get; set; }
    public DbSet<Sport> Sports { get; set; }
    public DbSet<SportSpecialistIds> SportSpecialistIds { get; set; }

    public DbSet<BaseParticipants> BaseParticipants { get; set; }
    public DbSet<TwoParticipants> TwoParticipants { get; set; }
    public DbSet<Result> Results { get; set; }
    
    public DbSet<Participant> Participants { get; set; }
    public DbSet<Team> Teams { get; set; }
    public DbSet<Player> Players { get; set; }

    public DbSet<Odd> Odds { get; set; }
    public DbSet<ParticipantOdd> ParticipantOdds { get; set; }
    public DbSet<TieOdd> TieOdds { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    
    public DbSet<Bet> Bets { get; set; }
    public DbSet<MultiBet> MultiBets { get; set; }
    public DbSet<SimpleBet> SimpleBets { get; set; }
    public DbSet<OddBetIds> EventIdBets { get; set; }

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