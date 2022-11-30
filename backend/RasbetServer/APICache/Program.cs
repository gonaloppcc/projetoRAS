using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

using HttpClient client = new();
client.DefaultRequestHeaders.Accept.Clear();
client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

const string apiUrl = "http://ucras.di.uminho.pt/v1/games/";

await FetchGames(client);

static async Task FetchGames(HttpClient client) {
    var json = await client.GetStringAsync(apiUrl);

    Console.WriteLine(json);
}


app.MapGet("/", () => "Hello World!");

app.Run();