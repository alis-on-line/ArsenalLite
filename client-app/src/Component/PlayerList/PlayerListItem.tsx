import { FC, SyntheticEvent, useState } from "react";
import { Button, Card } from "semantic-ui-react";
import user from "./../../assets/user.svg";
import { IPlayer } from "../../Interfaces/interface";
import "./PlayerListItem.css";

interface IPlayerListItem {
  player: IPlayer;
  selectPlayer: (id: number) => void;
  deletePlayer: (id: number) => void;
  isSubmitting: boolean;
}

const PlayerListItem: FC<IPlayerListItem> = ({
  player,
  selectPlayer,
  deletePlayer,
  isSubmitting,
}) => {
  const [target, setTarget] = useState("");

  const handlePlayerDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    setTarget(e.currentTarget.name);
    deletePlayer(id);
  };

  return (
    <>
      {player && (
        <Card.Group>
          <Card fluid>
            <Card.Content to={`/edit/${player.playerID}`}>
              <img src={user} alt="logo" />
              <Card.Header>{player.playerName}</Card.Header>
              <Card.Meta>{`Position: ${player.position}`}</Card.Meta>
              <Card.Meta>{`Jersey Number: ${player.jerseyNumber}`}</Card.Meta>
              <Card.Description>
                {`Goals Scored: ${player.goalsScored}`}
              </Card.Description>
              <Card.Meta>
                <Button
                  onClick={() => selectPlayer(player.playerID)}
                  floated="right"
                  content="Edit"
                  color="red"
                  className="player-list-item__edit-button"
                ></Button>
                <Button
                  name={player.playerID}
                  loading={isSubmitting && target === player.playerID}
                  onClick={(e) => handlePlayerDelete(e, player.playerID)}
                  floated="right"
                  content="Delete"
                  color="red"
                  className="player-list-item__delete-button"
                ></Button>
              </Card.Meta>
            </Card.Content>
          </Card>
        </Card.Group>
      )}
    </>
  );
};

export default PlayerListItem;
