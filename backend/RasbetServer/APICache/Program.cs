using System.Net.Http.Headers;
using APICache.lib;

using HttpClient client = new();
client.DefaultRequestHeaders.Accept.Clear();
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
client.DefaultRequestHeaders.Add("User-Agent", "RASBet Application");

const int refreshRate = 5000; //10 * 60;

var rand = new Random();
var api = new Api();

async void FetcherJob() {
    while (true) {
        //await api.FetchGames(client);

        var num = rand.Next();

        api.WriteToDatabase("AAA");

        Console.WriteLine("New Games were just fetched!");

        Thread.Sleep(refreshRate);
    }
    // ReSharper disable once FunctionNeverReturns
}

Console.WriteLine("Please make sure the vpn is connected!");

new Thread(FetcherJob).Start();