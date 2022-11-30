using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RasbetServer.Repositories;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.app;

public class Startup
{
    public IConfiguration Configuration { get; }
    public string ConnectionString { get; }

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
        ConnectionString = "rasbet";
        //ConnectionString = Configuration.GetConnectionString("DefaultCon") ?? throw new InvalidOperationException();
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvc(options => options.EnableEndpointRouting = false);
        services.AddControllers();

        services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase(ConnectionString));

        services.AddScoped<IBetterRepository, BetterRepository>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
            app.UseDeveloperExceptionPage();
        else
            app.UseHsts();

        app.UseHttpsRedirection();
        app.UseMvc();
    }
}