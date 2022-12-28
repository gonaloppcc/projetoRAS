using System.Net.Http.Headers;
using APICache.lib;

using HttpClient client = new();
client.DefaultRequestHeaders.Accept.Clear();
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
client.DefaultRequestHeaders.Add("User-Agent", "RASBet Application");

const int refreshRate = 600000; //10 * 60 * 1000 = 10 minutes;

var api = new Api();

Console.WriteLine("Please make sure the vpn is connected!");

while (true) {
        var json = await api.FetchGames(client);

        bool dbChanged = await api.WriteToDatabase(json);
        var time = DateTime.Now;
        
        Console.WriteLine(dbChanged ? $"[{time.Hour}:{time.Minute}] New games were just fetched!" : $"[{time.Hour}:{time.Minute}] No new games were fetched");

        Thread.Sleep(refreshRate);
}