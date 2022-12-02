using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using RasbetServer.app;
using RasbetServer.Repositories;
using RasbetServer.Repositories.Contexts;

var host = WebHost.CreateDefaultBuilder(args)
    .UseStartup<Startup>()
    .Build();

using (var scope = host.Services.CreateScope())
using (var context = scope.ServiceProvider.GetService<AppDbContext>())
    context?.Database.EnsureCreated();

host.Run();