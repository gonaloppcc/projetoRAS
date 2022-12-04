using System.Globalization;
using MySqlConnector;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
    public bool WriteToDatabase(string data) {
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
            
            
            away = jobject["awayTeam"].Value<string>();

            var outcomes = jobject["bookmakers"].ToObject<JArray>()
                .First["markets"]
                .First["outcomes"]
                .ToObject<JArray>();
            
            foreach (var odd in outcomes)
            {
                var team = odd["name"].Value<string>();
                var price = odd["price"].Value<float>();

                if (team == away)
                    priceAway = price;
                else if (team == "Draw")
                    priceDraw = price;
                else
                {
                    home = team;
                    priceHome = price;
                }
            }

            if (home is null || away is null)
                throw new JsonException();

            try
            {
                ExecuteInsert(id, home, priceHome, away, priceAway, priceDraw);
                dbChanged = true;
            }
            catch (MySqlException e)
            { }
        }

        return dbChanged;
    }

    private void ExecuteInsert(string id, string home, float homePrice, string away, float awayPrice, float drawPrice)
    {
        var insert = 
            "INSERT INTO TwoTeamParticipants(id, Home, HomePrice, Away, AwayPrice, DrawPrice)" +
                "VALUES (" +
                $"'{id}'," +
                $"'{home}'," +
                $"{homePrice.ToString(CultureInfo.InvariantCulture)}," +
                $"'{away}'," +
                $"{awayPrice.ToString(CultureInfo.InvariantCulture)}," +
                $"{drawPrice.ToString(CultureInfo.InvariantCulture)}" +
            ")";
        
        var cmd = new MySqlCommand(insert, _dataSource);
        cmd.ExecuteNonQuery();
    }
}