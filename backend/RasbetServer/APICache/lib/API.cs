using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Models.Bets.Odds;
using RasbetServer.Models.Events;
using RasbetServer.Models.Events.Participants;
using RasbetServer.Models.Events.Participants.Participant;
using RasbetServer.Repositories.Contexts;
using RasbetServer.Repositories.EventRepository;

namespace APICache.lib;

public class Api {
    private const string ApiUrl = "http://ucras.di.uminho.pt/v1/games/";

    const string ConnectionString =
        "Host=localhost;Username=root;Password=root;Database=rasbet"; // FIXME: Should be in env file

    private readonly MySqlConnection _dataSource;

    public Api() {
        _dataSource = new MySqlConnection(ConnectionString);
        _dataSource.Open();
    }


    public async Task<string> FetchGames(HttpClient client) {
        return await client.GetStringAsync(ApiUrl);
    }

    // TODO: Needs cleanup
    public async Task<bool> WriteToDatabase(string data) {
        JArray json = JArray.Parse(data);
        bool dbChanged = false;
        
        foreach (var game in json)
        {
            var jobject = game.ToObject<JObject>();

            string id = jobject["id"].Value<string>();
            string home = null; 
            string away = null;
            float priceHome = 0;
            float priceAway = 0;
            float priceDraw = 0;
            DateTime commenceTime;
            bool completed;
            
            
            away = jobject["awayTeam"].Value<string>();
            home = jobject["homeTeam"].Value<string>();
            commenceTime = jobject["commenceTime"].Value<DateTime>();
            completed = jobject["completed"].Value<bool>();

            var outcomes = jobject["bookmakers"].ToObject<JArray>()
                .First["markets"]
                .First["outcomes"]
                .ToObject<JArray>();
            
            foreach (var odd in outcomes)
            {
                var team = odd["name"].Value<string>();
                var price = odd["price"].Value<float>();
                
                if (team == home)
                    priceHome = price;
                else if (team == away)
                    priceAway = price;
                else
                    priceDraw = price;
            }

            if (home is null || away is null)
                throw new JsonException();

            var partHome = new Team(home, "Football", new List<Player>());
            var partAway = new Team(away, "Football", new List<Player>());
            var partOddHome = new ParticipantOdd(priceHome, partHome, null);
            var partOddAway = new ParticipantOdd(priceAway, partAway, null);
            var tieOdd = new TieOdd(priceDraw, null);
            var participants = new TwoParticipants(new Result(partOddHome, 0), new Result(partOddAway, 0), tieOdd);
            var match = new FootballEvent(id, participants, commenceTime, "Portuguese First League", completed);
            
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseMySQL(ConnectionString)
                .Options;
            var context = new EventRepository(new AppDbContext(options));
            try
            {
                await context.AddAsync(match);
                dbChanged = true;
            }
            catch (DbUpdateException e)
            { }
        }

        return dbChanged;
    }
}