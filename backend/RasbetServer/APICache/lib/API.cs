using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RasbetServer.Resources.Events.Event.BaseParticipants.Result;
using RasbetServer.Resources.Events.Event.BaseParticipants.TwoParticipants;
using RasbetServer.Resources.Events.Event.FootballEvent;
using RasbetServer.Resources.Events.Participants.Participant.Team;
using RasbetServer.Resources.Odds.ParticipantOdds;
using RasbetServer.Resources.Odds.TieOdds;

namespace APICache.lib;

public class Api {
    private const string ApiUrl = "http://ucras.di.uminho.pt/v1/games/";
    private const string RasbetUrl = "http://localhost:5000/";
    private const string CacheEndpoint = "events/apiCache";
    private const string ParticipantEndpoint = "participants/teams";

    private readonly HttpClient _client;

    public Api()
    {
        _client = new HttpClient();
        _client.BaseAddress = new Uri(RasbetUrl);
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }
    
    public async Task<string> FetchGames(HttpClient client) {
        return await client.GetStringAsync(ApiUrl);
    }

    // TODO: Needs cleanup
    public async Task<bool> WriteToDatabase(string data) {
        JArray json = JArray.Parse(data);
        bool dbChanged = false;
        var eventList = new List<SaveFootballEventResource>();
        var participantList = new List<SaveTeamResource>();
        
        foreach (var game in json)
        {
            var jobject = game.ToObject<JObject>();

            string id = jobject["id"].Value<string>();
            string home = null; 
            string away = null;
            int? scoreHome = null;
            int? scoreAway = null;
            float priceHome = 0;
            float priceAway = 0;
            float priceDraw = 0;
            DateTime commenceTime;
            bool completed;
            
            
            away = jobject["awayTeam"].Value<string>();
            home = jobject["homeTeam"].Value<string>();
            commenceTime = jobject["commenceTime"].Value<DateTime>();
            completed = jobject["completed"].Value<bool>();
            var str = jobject["scores"]!.Value<string>();
            if (str is not null)
            {
                var scores = str.Split('x');
                scoreHome = int.Parse(scores[0]);
                scoreAway = int.Parse(scores[1]);
            }

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

            var homeResource = new SaveResultResource
            {
                Score = scoreHome,
                Participant = new SaveParticipantOddResource
                {
                    Price = priceHome,
                    PartId = home,
                    Promo = null
                }
            };

            var awayResource = new SaveResultResource
            {
                Score = scoreAway,
                Participant = new SaveParticipantOddResource
                {
                    Price = priceAway,
                    PartId = away,
                    Promo = null
                }
            };

            var tieOddResource = new SaveTieOddResource
            {
                Price = priceDraw,
                Promo = null
            };
            
            var participantsResource = new SaveTwoParticipantsResource
            {
                Home = homeResource,
                Away = awayResource,
                Tie = tieOddResource
            };

            var eventResource = new SaveFootballEventResource
            {
                Date = commenceTime,
                CompetitionId = "Portuguese First League",
                Completed = completed,
                Participants = participantsResource
            };

            var homeParticipantResource = new SaveTeamResource
            {
                Name = home,
                SportId = "Football",
                Players = new List<string>()
            };
            var awayParticipantResource = new SaveTeamResource
            {
                Name = away,
                SportId = "Football",
                Players = new List<string>()
            };
            
            eventList.Add(eventResource);
            participantList.Add(homeParticipantResource);
            participantList.Add(awayParticipantResource);
        }
        
        participantList = participantList.DistinctBy(e => e.Name).ToList();
        foreach (var participant in participantList)
        {
            var body = JsonConvert.SerializeObject(participant);
            var content = new StringContent(body, Encoding.UTF8, "application/json");
            await _client.PostAsync(ParticipantEndpoint, content);
        }
        
        var jsonList = eventList.Select(e => new JObject
        {
            ["Sport"] = "Football",
            ["Event"] = JObject.FromObject(e)
        });
        var serialized = new StringContent(JsonConvert.SerializeObject(jsonList), Encoding.UTF8, "application/json");
        await _client.PostAsync(CacheEndpoint, serialized);
        
        return dbChanged;
    }
}