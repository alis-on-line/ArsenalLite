namespace ArsenalLite.Domain.Aggregates.PlayerAggregate;

public class Player
{
    public Player(string playerName, string position, int goalsScored, int jerseyNumber)
    {
        PlayerName = playerName;
        Position = position;
        GoalsScored = goalsScored;
        JerseyNumber = jerseyNumber;
    }

    public int PlayerID { get; set; }
    public string PlayerName { get; set; }
    public string Position { get; set; }
    public int GoalsScored { get; set; }
    public int JerseyNumber { get; set; }
}