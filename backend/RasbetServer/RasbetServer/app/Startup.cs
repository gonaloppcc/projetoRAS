using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using RasbetServer.Repositories.BetRepository;
using RasbetServer.Repositories.CompetitionRepository;
using RasbetServer.Repositories.Contexts;
using RasbetServer.Repositories.EventRepository;
using RasbetServer.Repositories.ParticipantRepository;
using RasbetServer.Repositories.SportRepository;
using RasbetServer.Repositories.UserRepository;
using RasbetServer.Services.Bets;
using RasbetServer.Services.Competitions;
using RasbetServer.Services.Events;
using RasbetServer.Services.Participants;
using RasbetServer.Services.Sports;
using RasbetServer.Services.Users;

namespace RasbetServer.app;

public class Startup
{
    public IConfiguration Configuration { get; }
    public string ConnectionString { get; }
    private const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
        ConnectionString = new ConfigurationBuilder()
            .SetBasePath($"{Directory.GetCurrentDirectory()}/app")
            .AddJsonFile("appsettings.json")
            .Build()
            .GetConnectionString("MySQLConnection");
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvc(options => options.EnableEndpointRouting = false);
        services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                policy =>
                {
                    policy.AllowAnyOrigin()
                        .SetIsOriginAllowedToAllowWildcardSubdomains().AllowAnyHeader()
                        .WithMethods("GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH");
                });
        });
        services.AddControllers()
            .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
        services.AddDbContext<AppDbContext>(options => options.UseLazyLoadingProxies().UseMySQL(ConnectionString));

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IUserService, UserService>();
        
        services.AddScoped<IEventRepository, EventRepository>();
        services.AddScoped<IEventService, EventService>();
        
        services.AddScoped<ISportRepository, SportRepository>();
        services.AddScoped<ISportService, SportService>();
        
        services.AddScoped<ICompetitionRepository, CompetitionRepository>();
        services.AddScoped<ICompetitionService, CompetitionsService>();
        
        services.AddScoped<IBetRepository, BetRepository>();
        services.AddScoped<IBetService, BetService>();

        services.AddScoped<IParticipantRepository, ParticipantRepository>();
        services.AddScoped<IParticipantService, ParticipantService>();

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseCors(MyAllowSpecificOrigins);
        if (env.IsDevelopment())
            app.UseDeveloperExceptionPage();
        else
            app.UseHsts();

        //app.UseHttpsRedirection();
        app.UseMvc();
    }
}