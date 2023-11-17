namespace ArsenalLite.Infrastructure.Services;

public class PlayerService : IPlayerService
{
    private readonly DataContext _dataContext;
    public PlayerService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<List<Player>> GetAllPlayers()
    {
        return await _dataContext.Players.ToListAsync();
    }

    public async Task<Player?> GetPlayerById(int id)
    {
        var player = await _dataContext.Players.FindAsync(id);
        return player ?? null;
    }

    public async Task<Player> AddPlayer(Player player)
    {
        var newPlayer = new Player(player.PlayerName, player.Position, player.GoalsScored, player.JerseyNumber);
        await _dataContext.Players.AddAsync(newPlayer);
        await _dataContext.SaveChangesAsync();
        return newPlayer;
    }

    public async Task<Player> UpdatePlayer(Player existingPlayer, Player updatedPlayer)
    {
        
        existingPlayer.PlayerName = updatedPlayer.PlayerName;
        existingPlayer.Position = updatedPlayer.Position;
        existingPlayer.GoalsScored = updatedPlayer.GoalsScored;
        existingPlayer.JerseyNumber = updatedPlayer.JerseyNumber;
        await _dataContext.SaveChangesAsync();
        return existingPlayer;
    }

    public async Task<Player> DeletePlayer(Player player)
    {
        _dataContext.Remove(player);
        await _dataContext.SaveChangesAsync();
        return player;
    }
}