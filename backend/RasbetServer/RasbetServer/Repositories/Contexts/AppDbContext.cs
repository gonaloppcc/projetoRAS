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

    private void SeedSports()
    {
        Sports.Add(new Sport ("0", "Football"));
        Sports.Add(new Sport("1", "Basketball"));
        Sports.Add(new Sport("2", "Tennis"));
        Sports.Add(new Sport("3", "Volleyball"));
        Sports.Add(new Sport("4", "Hockey"));
        Sports.Add(new Sport("5", "Baseball"));
        Sports.Add(new Sport("6", "Handball"));
        Sports.Add(new Sport("7", "Rugby"));
        Sports.Add(new Sport("8", "Cricket"));
        Sports.Add(new Sport("9", "American Football"));
        Sports.Add(new Sport("10", "Ice Hockey"));
    }

    private void SeedCompetitions()
    {
        Competitions.Add(new Competition("0", "Premier League", "0"));
        Competitions.Add(new Competition("1", "Championship", "0"));
        Competitions.Add(new Competition("2", "League One", "0"));
        Competitions.Add(new Competition("3", "League Two", "0"));
        Competitions.Add(new Competition("4", "National League", "0"));
        Competitions.Add(new Competition("5", "National League North", "0"));
        Competitions.Add(new Competition("6", "National League South", "0"));
        Competitions.Add(new Competition("7", "NBA", "1"));
        Competitions.Add(new Competition("8", "NCAA", "1"));
    }

    private void SeedParticipants()
    {
        Participants.Add(new Team("0", "Manchester United", new List<Player>()));
        Participants.Add(new Team("1", "Manchester City", new List<Player>()));
        Participants.Add(new Team("2", "Liverpool", new List<Player>()));
        Participants.Add(new Team("3", "Chelsea", new List<Player>()));
        Participants.Add(new Team("4", "Arsenal", new List<Player>()));
        Participants.Add(new Team("5", "Tottenham", new List<Player>()));
        Participants.Add(new Team("6", "Everton", new List<Player>()));
        Participants.Add(new Team("7", "Leicester", new List<Player>()));
        Participants.Add(new Team("8", "West Ham", new List<Player>()));
        Participants.Add(new Team("9", "Wolves", new List<Player>()));
        Participants.Add(new Team("10", "Crystal Palace", new List<Player>()));
        Participants.Add(new Team("11", "Southampton", new List<Player>()));
        Participants.Add(new Team("12", "Burnley", new List<Player>()));
        Participants.Add(new Team("13", "Brighton", new List<Player>()));
        Participants.Add(new Team("14", "Newcastle", new List<Player>()));
        Participants.Add(new Team("15", "Bournemouth", new List<Player>()));
        Participants.Add(new Team("16", "Aston Villa", new List<Player>()));
        Participants.Add(new Team("17", "Sheffield United", new List<Player>()));
        Participants.Add(new Team("18", "Norwich", new List<Player>()));
        Participants.Add(new Team("19", "Watford", new List<Player>()));
        Participants.Add(new Team("20", "Brentford", new List<Player>()));
    }

    private void SeedOdds()
    {
        Odds.Add(new ParticipantOdd("0", 1.90f, "0", null));
        Odds.Add(new ParticipantOdd("1", 2.20f, "1", null));
        Odds.Add(new ParticipantOdd("2", 3.60f, "2", null));
        Odds.Add(new ParticipantOdd("3", 4.20f, "3", null));
        Odds.Add(new ParticipantOdd("4", 4.58f, "4", null));
        Odds.Add(new ParticipantOdd("5", 5.20f, "5", null));
        Odds.Add(new ParticipantOdd("6", 5.60f, "6", null));
        Odds.Add(new ParticipantOdd("7", 6.20f, "7", null));
        Odds.Add(new ParticipantOdd("8", 6.60f, "8", null));

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
        Specialists.Add(new Specialist("5", "email1@email.com", "username1", "password1", new List<SportSpecialistIds>()));
        Specialists.Add(new Specialist("6", "email2@email.com", "username2", "password2", new List<SportSpecialistIds>()));
        Specialists.Add(new Specialist("7", "email3@email.com", "username3", "password3", new List<SportSpecialistIds>()));
        Specialists.Add(new Specialist("8", "email4@email.com", "username4", "password4", new List<SportSpecialistIds>()));
        Specialists.Add(new Specialist("9", "email5@email.com", "username5", "password5", new List<SportSpecialistIds>()));
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