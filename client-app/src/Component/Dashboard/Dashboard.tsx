import { FC } from "react";
import { Grid } from "semantic-ui-react";
import PlayerListItem from "../PlayerList/PlayerListItem";
import { IPlayer } from "../../Interfaces/interface";
import PlayerEdit from "../Player/PlayerEdit";
import PlayerAdd from "../Player/PlayerAdd";

interface IDashboard {
  players: IPlayer[];
  selectedPlayer: IPlayer | undefined;
  selectPlayer: (id: number) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  addMode: boolean;
  createPlayer: (player: IPlayer) => void;
  editPlayer: (player: IPlayer) => void;
  deletePlayer: (id: number) => void;
  isSubmitting: boolean;
}

const Dashboard: FC<IDashboard> = ({
  players,
  selectedPlayer,
  selectPlayer,
  cancelSelectActivity,
  editMode,
  addMode,
  createPlayer,
  editPlayer,
  deletePlayer,
  isSubmitting,
}) => {
  const existingJerseyNumbers = players.map((x) => x.jerseyNumber);
  const numbers = Array.from({ length: 99 }, (_, i) => i + 1);
  const availableNumbers = numbers.filter(
    (x) => !existingJerseyNumbers.includes(x)
  );
  const positions = [
    { key: "gk", value: "Goalkeeper", text: "Goalkeeper" },
    { key: "df", value: "Defender", text: "Defender" },
    { key: "mf", value: "Midfielder", text: "Midfielder" },
    { key: "fw", value: "Forward", text: "Forward" },
  ];

  const jerseyNumberAvailable: { key: number; value: number; text: string }[] =
    [];
  availableNumbers.forEach((x) => {
    jerseyNumberAvailable.push({ key: x, value: x, text: x.toLocaleString() });
  });

  return (
    players &&
    players.length > 0 && (
      <Grid>
        <Grid.Column width="15">
          {selectedPlayer && editMode && (
            <PlayerEdit
              selectedPlayer={selectedPlayer}
              cancelSelectActivity={cancelSelectActivity}
              editMode={editMode}
              positions={positions}
              jerseyNumberAvailable={jerseyNumberAvailable}
              editPlayer={editPlayer}
              isSubmitting={isSubmitting}
            />
          )}
          {addMode && (
            <PlayerAdd
              cancelSelectActivity={cancelSelectActivity}
              addMode={addMode}
              positions={positions}
              jerseyNumberAvailable={jerseyNumberAvailable}
              createPlayer={createPlayer}
              isSubmitting={isSubmitting}
            />
          )}
        </Grid.Column>
        {players.map((player) => (
          <Grid.Column width="5">
            {player && (
              <PlayerListItem
                player={player}
                selectPlayer={selectPlayer}
                deletePlayer={deletePlayer}
                isSubmitting={isSubmitting}
              />
            )}
          </Grid.Column>
        ))}
      </Grid>
    )
  );
};

export default Dashboard;
