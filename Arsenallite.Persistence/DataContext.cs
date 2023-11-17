using ArsenalLite.Domain.Aggregates.PlayerAggregate;
using Microsoft.EntityFrameworkCore;

namespace ArsenalLite.Persistence;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options) { }

    public DbSet<Player> Players { get; set; }
}