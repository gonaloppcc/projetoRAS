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
    }

    private void SeedSports()
    {
        Sports.Add(new Sport("Football"));
        Sports.Add(new Sport("Basketball"));
        Sports.Add(new Sport("Tennis"));
        Sports.Add(new Sport("Volleyball"));
        Sports.Add(new Sport("Hockey"));
        Sports.Add(new Sport("Baseball"));
        Sports.Add(new Sport("Handball"));
        Sports.Add(new Sport("Rugby"));
        Sports.Add(new Sport("Cricket"));
        Sports.Add(new Sport("American Football"));
        Sports.Add(new Sport("Ice Hockey"));
    }

    private void SeedCompetitions()
    {
        Competitions.Add(new Competition("Premier League", "Football"));
        Competitions.Add(new Competition("Portuguese First League", "Football"));
        Competitions.Add(new Competition("Championship", "Football"));
        Competitions.Add(new Competition("League One", "Football"));
        Competitions.Add(new Competition("League Two", "Football"));
        Competitions.Add(new Competition("National League", "Football"));
        Competitions.Add(new Competition("National League North", "Football"));
        Competitions.Add(new Competition("National League South", "Football"));
        Competitions.Add(new Competition("NBA", "Basketball"));
        Competitions.Add(new Competition("NCAA", "Basketball"));
    }

    private void SeedParticipants()
    {
        Participants.Add(new Team("Manchester United", new List<Player>()));
        Participants.Add(new Team("Manchester City", new List<Player>()));
        Participants.Add(new Team("Liverpool", new List<Player>()));
        Participants.Add(new Team("Chelsea", new List<Player>()));
        Participants.Add(new Team("Arsenal", new List<Player>()));
        Participants.Add(new Team("Tottenham", new List<Player>()));
        Participants.Add(new Team("Everton", new List<Player>()));
        Participants.Add(new Team("Leicester", new List<Player>()));
        Participants.Add(new Team("West Ham", new List<Player>()));
        Participants.Add(new Team("Wolves", new List<Player>()));
        Participants.Add(new Team("Crystal Palace", new List<Player>()));
        Participants.Add(new Team("Southampton", new List<Player>()));
        Participants.Add(new Team("Burnley", new List<Player>()));
        Participants.Add(new Team("Brighton", new List<Player>()));
        Participants.Add(new Team("Newcastle", new List<Player>()));
        Participants.Add(new Team("Bournemouth", new List<Player>()));
        Participants.Add(new Team("Aston Villa", new List<Player>()));
        Participants.Add(new Team("Sheffield United", new List<Player>()));
        Participants.Add(new Team("Norwich", new List<Player>()));
        Participants.Add(new Team("Watford", new List<Player>()));
        Participants.Add(new Team("Brentford", new List<Player>()));
    }

    private void SeedOdds()
    {
        Odds.Add(new ParticipantOdd("0", 1.90f, "Manchester United", null));
        Odds.Add(new ParticipantOdd("1", 2.20f, "Manchester City", null));
        Odds.Add(new ParticipantOdd("2", 3.60f, "Liverpool", null));
        Odds.Add(new ParticipantOdd("3", 4.20f, "Chelsea", null));
        Odds.Add(new ParticipantOdd("4", 4.58f, "Arsenal", null));
        Odds.Add(new ParticipantOdd("5", 5.20f, "Tottenham", null));
        Odds.Add(new ParticipantOdd("6", 5.60f, "Everton", null));
        Odds.Add(new ParticipantOdd("7", 6.20f, "Leicester", null));
        Odds.Add(new ParticipantOdd("8", 6.60f, "West Ham", null));

        Odds.Add(new TieOdd("100", 3.20f, null));
        Odds.Add(new TieOdd("101", 3.20f, null));
        Odds.Add(new TieOdd("102", 3.20f, null));
        Odds.Add(new TieOdd("103", 3.20f, null));
        Odds.Add(new TieOdd("104", 3.20f, null));
        Odds.Add(new TieOdd("105", 3.20f, null));
        Odds.Add(new TieOdd("106", 3.20f, null));
        Odds.Add(new TieOdd("107", 3.20f, null));
        Odds.Add(new TieOdd("108", 3.20f, null));
    }

    private void SeedBetters()
    {
        Betters.Add(new Better("0", "marco@gmail.com", "marco", "marco123", "123456789", "123456789", "123456789", 20,
            new List<Transaction>()));
        Betters.Add(new Better("1", "diogo@gmail.com", "diogo", "marco123", "123456789", "123456789", "123456789", 200,
            new List<Transaction>()));
        Betters.Add(new Better("2", "goncalo@gmail.com", "goncalo", "marco123", "123456789", "123456789", "123456789", 2000,
            new List<Transaction>()));
        Betters.Add(new Better("3", "barbara@gmail.com", "barbara", "marco123", "123456789", "123456789", "123456789",
            500, new List<Transaction>()));
        Betters.Add(new Better("4", "grandeMarco@gmail.com", "grandemarco", "marco123", "123456789", "123456789",
            "123456789", 305, new List<Transaction>()));
    }

    private void SeedSpecialists()
    {
        Specialists.Add(new Specialist("5", "email1@email.com", "username1", "password1", new List<Sport>()));
        Specialists.Add(new Specialist("6", "email2@email.com", "username2", "password2", new List<Sport>()));
        Specialists.Add(new Specialist("7", "email3@email.com", "username3", "password3", new List<Sport>()));
        Specialists.Add(new Specialist("8", "email4@email.com", "username4", "password4", new List<Sport>()));
        Specialists.Add(new Specialist("9", "email5@email.com", "username5", "password5", new List<Sport>()));
    }
    
    public void Seed()
    {
        Users.Add(new Administrator("admin@rasbet.com", "Admin", "RasbetAdmin123"));
        
        SeedBetters();
        SeedSpecialists();
        SeedSports();
        SeedCompetitions();
        SeedParticipants();
        SeedOdds();
        
        SaveChanges();
    }
}