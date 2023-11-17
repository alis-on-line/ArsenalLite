import { ChangeEvent, FC, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IPlayer } from "../../Interfaces/interface";

interface IPlayerEdit {
  selectedPlayer: IPlayer;
  cancelSelectActivity: () => void;
  editMode: boolean;
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
  editPlayer: (player: IPlayer) => void;
  isSubmitting: boolean;
}

const PlayerEdit: FC<IPlayerEdit> = ({
  selectedPlayer,
  cancelSelectActivity,
  editMode,
  positions,
  jerseyNumberAvailable,
  editPlayer,
  isSubmitting,
}) => {
  const initialState = selectedPlayer ?? {
    playerName: "",
    position: "",
    jerseyNumber: 99,
    goalsScored: 0,
  };

  const [player, setPlayer] = useState(initialState);

  if (initialState.playerID !== player.playerID) {
    setPlayer(initialState);
  }

  const handleSubmit = () => {
    editPlayer(player);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  };

  const handleGoalsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = event.target;
    setPlayer({ ...player, [name]: valueAsNumber });
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
    editMode && (
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            data-tooltip="Edit player name."
            placeholder="Player Name"
            value={player.playerName}
            name="playerName"
            onChange={handleInputChange}
          />
          <Form.Select
            data-tooltip="Edit player position."
            placeholder="Postion"
            options={positions}
            value={player.position}
            onChange={handlePostionChange}
            name="position"
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
            onChange={handleGoalsChange}
          />
          <Button
            loading={isSubmitting}
            floated="right"
            positive
            type="submit"
            content="Submit"
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

export default PlayerEdit;
