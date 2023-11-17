namespace ArsenalLite.Infrastructure.Services;

public class ValidatorService : IValidatorService
{
    public bool HasValidName(Player player)
    {
        return !string.IsNullOrEmpty(player.PlayerName);
    }

    public bool HasValidJerseyNumber(List<Player> players, Player player)
    {
        return players.All(x => player.JerseyNumber != x.JerseyNumber);
    }
}