namespace ArsenalLite.Models;

public class PlayersDto
{
    public PlayersDto(Player player)
    {
        PlayerID = player.PlayerID;
        PlayerName = player.PlayerName;
        Position = player.Position;
        GoalsScored = player.GoalsScored;
        JerseyNumber = player.JerseyNumber;
    }

    public int PlayerID { get; }
    public string PlayerName { get; }
    public string Position { get; }
    public int GoalsScored { get; }
    public int JerseyNumber { get; }
}