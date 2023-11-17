namespace ArsenalLite.Infrastructure.Services;

public interface IValidatorService
{
    bool HasValidName(Player player);

    bool HasValidJerseyNumber(List<Player> players, Player player);
}