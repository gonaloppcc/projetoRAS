using System.Net;
using System.Text;

const int port = 8080;

// Creating the HTTP server and set it to listen to port 8080
HttpListener server = new HttpListener();
server.Prefixes.Add($"http://*:{port}/");
server.Start();
Console.WriteLine($"Listening on port {port}");

while (true)
{
    // Accept the connection
    var context = server.GetContext();
    var response = context.Response;

    // Find the file requested and blacklist the favicon.ico
    // that browsers like to request
    string filePath = Directory.GetCurrentDirectory() + context.Request.Url?.LocalPath;
    switch (context.Request.Url?.LocalPath)
    {
        case "/":
            filePath = "index.html";
            break;
        case "/favicon.ico":
            continue;
    }

    // Read file contents
    var reader = new StreamReader(filePath);
    string fileContent = reader.ReadToEnd();

    // Convert the content to bytes and send it
    byte[] buffer = Encoding.UTF8.GetBytes(fileContent);
    response.ContentLength64 = buffer.Length;
    var oStream = response.OutputStream;
    oStream.Write(buffer, 0, buffer.Length);
    
    // Close the connection
    context.Response.Close();
}