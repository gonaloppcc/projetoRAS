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

    public async Task WriteToDatabase(string data) {
        // Insert some data
        await using var cmd =
            // noinspection SqlResolve
            _dataSource.CreateCommand($"INSERT INTO users(username) VALUES ('{data}')");

        cmd.Parameters.AddWithValue("Hello World");
        await cmd.ExecuteNonQueryAsync();
    }
}