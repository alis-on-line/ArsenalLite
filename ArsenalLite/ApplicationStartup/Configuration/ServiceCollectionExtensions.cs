namespace ArsenalLite.ApplicationStartup.Configuration;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection ConfigureServices(this IServiceCollection services)
    {
        ConfigureDependencies(services);
        services.AddCors(options =>
        {
            options.AddPolicy(
                "CorsPolicy",
                builder =>
                {
                    builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:3000");
                });
        });

        return services;
    }

    public static IServiceCollection ConfigureDependencies(this IServiceCollection services)
    {
        services.AddScoped<IPlayerService, PlayerService>();
        services.AddScoped<IValidatorService, ValidatorService>();
        return services;
    }
}