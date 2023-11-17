import { ChangeEvent, FC, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IPlayer } from "../../Interfaces/interface";

interface IPlayerEdit {
  cancelSelectActivity: () => void;
  addMode: boolean;
  positions: {
    key: string;
    value: string;
    text: string;
  }[];
  jerseyNumberAvailable: {
    key: number;
    value: number;
    text: string;
  }[];
  createPlayer: (player: IPlayer) => void;
  isSubmitting: boolean;
}

const PlayerAdd: FC<IPlayerEdit> = ({
  cancelSelectActivity,
  addMode,
  positions,
  jerseyNumberAvailable,
  createPlayer,
  isSubmitting,
}) => {
  const initialState: IPlayer = {
    playerID: 0,
    playerName: "",
    position: positions[1].value,
    jerseyNumber: jerseyNumberAvailable[0].value,
    goalsScored: 0,
  };
  const [player, setPlayer] = useState(initialState);

  const handleSubmit = () => {
    createPlayer(player);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleJerseyChange = (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setPlayer({ ...player, jerseyNumber: data.value });
  };

  const handlePostionChange = (
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) => {
    setPlayer({ ...player, position: data.value });
  };

  return (
    addMode && (
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            data-tooltip="Edit player name."
            placeholder="Player Name"
            value={player.playerName}
            name="playerName"
            onChange={handleInputChange}
            required={true}
          />
          <Form.Select
            data-tooltip="Edit player position."
            placeholder="Postion"
            options={positions}
            value={player.position}
            onChange={handlePostionChange}
            name="position"
            required={true}
          />
          <Form.Select
            data-tooltip="Edit player jersey number."
            placeholder={player.jerseyNumber}
            options={jerseyNumberAvailable}
            value={player.jerseyNumber}
            onChange={handleJerseyChange}
            name="jerseyNumber"
          />
          <input
            title="Edit number of goals scored."
            placeholder="Goals Scored"
            type="number"
            min={0}
            style={{ marginBottom: "1rem" }}
            value={player.goalsScored}
            name="goalsScored"
            onChange={handleInputChange}
          />
          <Button
            loading={isSubmitting}
            floated="right"
            positive
            type="submit"
            content="Add a player"
          />
          <Button
            floated="right"
            type="button"
            content="Cancel"
            onClick={() => cancelSelectActivity()}
          />
        </Form>
      </Segment>
    )
  );
};

export default PlayerAdd;
