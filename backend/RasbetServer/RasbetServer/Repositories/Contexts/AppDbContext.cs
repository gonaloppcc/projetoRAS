using Microsoft.EntityFrameworkCore;
using RasbetServer.Models.Bets;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Models.Users;
using RasbetServer.Models.Users.Better;
using RasbetServer.Models.Users.Notifications;

namespace RasbetServer.Repositories.Contexts;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Better> Betters { get; set; }
    public DbSet<Specialist> Specialists { get; set; }
    public DbSet<Administrator> Administrators { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<EventCompletedNotification> EventCompletedNotifications { get; set; }
    public DbSet<EventDateChangedNotification> EventDateChangedNotifications { get; set; }
    public DbSet<EventOddPriceChangedNotification> EventOddPriceChangedNotifications { get; set; }
    public DbSet<EventPromotionCreatedNotification> EventPromotionCreatedNotifications { get; set; }
    public DbSet<EventPromotionEndedNotification> EventPromotionEndedNotifications { get; set; }
    public DbSet<EventPromotionValueChangedNotification> EventPromotionValueChangedNotifications { get; set; }

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

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) 
    { }

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
        Participants.Add(new Team("Manchester United", "Football", new List<Player>()));
        Participants.Add(new Team("Manchester City", "Football", new List<Player>()));
        Participants.Add(new Team("Liverpool", "Football", new List<Player>()));
        Participants.Add(new Team("Chelsea", "Football", new List<Player>()));
        Participants.Add(new Team("Arsenal", "Football", new List<Player>()));
        Participants.Add(new Team("Tottenham", "Football", new List<Player>()));
        Participants.Add(new Team("Everton", "Football", new List<Player>()));
        Participants.Add(new Team("Leicester", "Football", new List<Player>()));
        Participants.Add(new Team("West Ham", "Football", new List<Player>()));
        Participants.Add(new Team("Wolves", "Football", new List<Player>()));
        Participants.Add(new Team("Crystal Palace", "Football", new List<Player>()));
        Participants.Add(new Team("Southampton", "Football", new List<Player>()));
        Participants.Add(new Team("Burnley", "Football", new List<Player>()));
        Participants.Add(new Team("Brighton", "Football", new List<Player>()));
        Participants.Add(new Team("Newcastle", "Football", new List<Player>()));
        Participants.Add(new Team("Bournemouth", "Football", new List<Player>()));
        Participants.Add(new Team("Aston Villa", "Football", new List<Player>()));
        Participants.Add(new Team("Sheffield United", "Football", new List<Player>()));
        Participants.Add(new Team("Norwich", "Football", new List<Player>()));
        Participants.Add(new Team("Watford", "Football", new List<Player>()));
        Participants.Add(new Team("Brentford", "Football", new List<Player>()));
    }

    private void SeedBetters()
    {
        Betters.Add(new Better("0", "marco@gmail.com", "marco", "marco123", "123456789", "123456789", "123456789", 20));
        Betters.Add(new Better("1", "diogo@gmail.com", "diogo", "marco123", "123456789", "123456789", "123456789", 200));
        Betters.Add(new Better("2", "goncalo@gmail.com", "goncalo", "marco123", "123456789", "123456789", "123456789", 2000));
        Betters.Add(new Better("3", "barbara@gmail.com", "barbara", "marco123", "123456789", "123456789", "123456789", 500));
        Betters.Add(new Better("4", "grandeMarco@gmail.com", "grandemarco", "marco123", "123456789", "123456789", 305));
    }

    private void SeedSpecialists()
    {
        Specialists.Add(new Specialist("5", "email1@email.com", "username1", "password1"));
        Specialists.Add(new Specialist("6", "email2@email.com", "username2", "password2"));
        Specialists.Add(new Specialist("7", "email3@email.com", "username3", "password3"));
        Specialists.Add(new Specialist("8", "email4@email.com", "username4", "password4"));
        Specialists.Add(new Specialist("9", "email5@email.com", "username5", "password5"));
    }
    
    public void Seed()
    {
        Users.Add(new Administrator("admin@rasbet.com", "Admin", "RasbetAdmin123"));
        
        SeedBetters();
        SeedSpecialists();
        SeedSports();
        SeedCompetitions();
        SeedParticipants();
        
        SaveChanges();
    }
}