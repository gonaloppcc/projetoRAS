using Npgsql;

namespace APICache.lib;

public class Api {
    private const string ApiUrl = "http://ucras.di.uminho.pt/v1/games/";

    const string ConnectionString =
        "Host=localhost:5432;Username=postgres;Password=root;Database=rasbet"; // FIXME: Should be in env file

    private readonly NpgsqlDataSource _dataSource;

    public Api() {
        _dataSource = NpgsqlDataSource.Create(ConnectionString);
    }


    public async Task FetchGames(HttpClient client) {
        var json = await client.GetStringAsync(ApiUrl);

        Console.WriteLine(json);
    }

    public void WriteToDatabase(string data) {
        var cmd = 
            // noinspection SqlResolve
            _dataSource.CreateCommand("INSERT INTO users(username) VALUES ('AAA')");

        Console.WriteLine("Here");

        cmd.ExecuteNonQuery();
        Console.WriteLine("Exec cmd!");
    }
}