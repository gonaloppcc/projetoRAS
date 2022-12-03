using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using RasbetServer.Repositories;
using RasbetServer.Repositories.Contexts;

namespace RasbetServer.app;

public class Startup {
    public IConfiguration Configuration { get; }
    public string ConnectionString { get; }

    public Startup(IConfiguration configuration) {
        Configuration = configuration;
        ConnectionString = "server=localhost;database=rasbet;user=root;password=root";
        //ConnectionString = Configuration.GetConnectionString("DefaultCon") ?? throw new InvalidOperationException();
    }

    public void ConfigureServices(IServiceCollection services) {
        services.AddMvc(options => options.EnableEndpointRouting = false);
        services.AddControllers();

        services.AddDbContext<AppDbContext>(options => options.UseMySQL(ConnectionString));

        services.AddScoped<IUserRepository, UserRepository>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "issuer", //Configuration["Jwt:Issuer"],
                    ValidAudience = "issuer", //Configuration["Jwt:Issuer"],
                    IssuerSigningKey =
                        new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes("marco és grandeeeeeeeeee" /*Configuration["Jwt:Key"]*/))
                };
            });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
        if (env.IsDevelopment())
            app.UseDeveloperExceptionPage();
        else
            app.UseHsts();

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

        app.UseMvc();
    }
}