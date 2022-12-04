using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.Contexts;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Repositories.UserRepository;

namespace RasbetServer.app;

public class Startup {
    public IConfiguration Configuration { get; }
    public string ConnectionString { get; } 
    private string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

    public Startup(IConfiguration configuration) {
        Configuration = configuration;
        ConnectionString = new ConfigurationBuilder()
            .SetBasePath($"{Directory.GetCurrentDirectory()}/app")
            .AddJsonFile("appsettings.json")
            .Build()
            .GetConnectionString("MySQLConnection");
    }

    public void ConfigureServices(IServiceCollection services) {
        services.AddMvc(options => options.EnableEndpointRouting = false);
        services.AddControllers();
        services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
            {
                policy.WithOrigins("http://localhost:3000", "*");
            });
        });

        services.AddDbContext<AppDbContext>(options => options.UseLazyLoadingProxies().UseMySQL(ConnectionString));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IEventRepository, EventRepository>();
        services.AddScoped<ISportRepository, SportRepository>();
        services.AddScoped<ICompetitionRepository, CompetitionRepository>();
        services.AddScoped<IBetRepository, BetRepository>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
        if (env.IsDevelopment())
            app.UseDeveloperExceptionPage();
        else
            app.UseHsts();

        app.UseHttpsRedirection();
        app.UseCors(MyAllowSpecificOrigins);
        app.UseMvc();
    }
}