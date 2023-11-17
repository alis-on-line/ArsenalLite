namespace ArsenalLite.Tests.UnitTests.Services;

public class ValidatorServiceTests
{
    private IValidatorService _validatorService;
    private List<Player> _players = new();

    [SetUp]
    public void Setup()
    {
        _validatorService = new ValidatorService();
        _players.Add(new Player("Aaron Ramsdale", "Goalkeeper", 0, 1));
        _players.Add(new Player("David Raya", "Goalkeeper", 0, 22));
        _players.Add(new Player("William Saliba", "Defender", 1, 2));
    }

    [Test]
    public void HasValidName_should_be_valid()
    {
        var player = new Player("Aaron Ramsdale", "Goalkeeper", 0, 1);
        var result = _validatorService.HasValidName(player);
        Assert.That(result, Is.True);
    }

    [Test]
    public void HasValidName_when_empty_should_be_invalid()
    {
        var player = new Player("", "Goalkeeper", 0, 1);
        var result = _validatorService.HasValidName(player);
        Assert.That(result, Is.False);
    }

    [Test]
    public void HasValidName_when_null_should_be_invalid()
    {
        var player = new Player(null, "Goalkeeper", 0, 1);
        var result = _validatorService.HasValidName(player);
        Assert.That(result, Is.False);
    }

    [Test]
    public void HasValidJerseyNumber_when_different_should_be_valid()
    {
        var player = new Player("Ben White", "Defender", 1, 4);
        var result = _validatorService.HasValidJerseyNumber(_players, player);
        Assert.That(result, Is.True);
    }

    [Test]
    public void HasValidJerseyNumber_when_same_should_be_invalid()
    {
        var player = new Player("Ben White", "Defender", 1, 22);
        var result = _validatorService.HasValidJerseyNumber(_players, player);
        Assert.That(result, Is.False);
    }
}