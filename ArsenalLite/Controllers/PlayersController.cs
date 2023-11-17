namespace ArsenalLite.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PlayersController : ControllerBase
{
    private readonly IPlayerService _playerService;
    private readonly IValidatorService _validatorService;
    public PlayersController(IPlayerService playerService, IValidatorService validatorService)
    {
        _playerService = playerService;
        _validatorService = validatorService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllPlayers()
    {
        var players = await _playerService.GetAllPlayers();
        return Ok(players.Select(x => new PlayersDto(x)));
    }

    [HttpPost]
    public async Task<IActionResult> AddPlayer(Player player)
    {
        var hasValidName = _validatorService.HasValidName(player);
        if (!hasValidName)
        {
            return BadRequest();
        }

        var players = await _playerService.GetAllPlayers();
        var hasValidJerseyNumber = _validatorService.HasValidJerseyNumber(players, player);
        if (!hasValidJerseyNumber)
        {
            return BadRequest();
        }

        var newPlayer = await _playerService.AddPlayer(player);
        return Ok(newPlayer);
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePlayer(Player player)
    {
        var existingPlayer = await _playerService.GetPlayerById(player.PlayerID);
        if (existingPlayer == null)
        {
            return NotFound();
        }

        var hasValidName = _validatorService.HasValidName(player);
        if (!hasValidName)
        {
            return BadRequest();
        }

        var players = await _playerService.GetAllPlayers();
        var hasValidJerseyNumber = _validatorService.HasValidJerseyNumber(players, player);
        if (!hasValidJerseyNumber)
        {
            return BadRequest();
        }

        var updatedPlayer = await _playerService.UpdatePlayer(existingPlayer, player);
        return Ok(updatedPlayer);
    }

    [HttpDelete]
    public async Task<IActionResult> DeletePlayer(int playerID)
    {
        var player = await _playerService.GetPlayerById(playerID);
        if (player == null) return NotFound();
        await _playerService.DeletePlayer(player);
        return Ok(player);
    }
}