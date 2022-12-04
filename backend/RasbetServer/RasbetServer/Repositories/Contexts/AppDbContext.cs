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
    public DbSet<Specialist> Specialists { get; set; }
    public DbSet<Administrator> Administrators { get; set; }
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
    public DbSet<OddBetIds> OddBetIds { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<OddBetIds>()
            .HasKey(obi => new { obi.MultiBetId, obi.OddId });
        modelBuilder.Entity<SportSpecialistIds>()
            .HasKey(ssi => new { ssi.SpecialistId, ssi.SportId });
    }

    public void Seed()
    {
        Users.Add(new Administrator("admin@rasbet.com", "Admin", "RasbetAdmin123"));
        var entity = Sports.Add(new Sport("Football"));
        Competitions.Add(new Competition("PortugueseFirstLeague", entity.Entity.Id));
        Competitions.Add(new Competition("EnglishFirstLeague", entity.Entity.Id));
        Competitions.Add(new Competition("ChampionsLeague", entity.Entity.Id));
        Competitions.Add(new Competition("EuropaLeague", entity.Entity.Id));

        SaveChanges();
    }
}