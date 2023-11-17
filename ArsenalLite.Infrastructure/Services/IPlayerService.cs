using ArsenalLite.Domain.Aggregates.PlayerAggregate;

namespace ArsenalLite.Infrastructure.Services;

public interface IPlayerService
{
    Task<List<Player>> GetAllPlayers();

    Task<Player?> GetPlayerById(int id);

    Task<Player> AddPlayer(Player player);

    Task<Player> UpdatePlayer(Player existingPlayer, Player updatedPlayer);

    Task<Player> DeletePlayer(Player player);
}