using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using RasbetServer.app;
using RasbetServer.Repositories.Contexts;

var host = WebHost.CreateDefaultBuilder(args)
    .UseStartup<Startup>()
    .Build();

using (var scope = host.Services.CreateScope())
using (var context = scope.ServiceProvider.GetService<AppDbContext>())
{
    context?.Database.EnsureCreated();
    if (args.Length > 0 && args[0] == "seed=true")
        context?.Seed();
}

host.Run();