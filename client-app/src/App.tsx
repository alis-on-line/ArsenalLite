import { useEffect, useState } from "react";
import { IPlayer } from "./Interfaces/interface";
import { Button, Container } from "semantic-ui-react";
import Dashboard from "./Component/Dashboard/Dashboard";
import NavBar from "./Component/Layout/NavBar";
import PlayersService from "./Services/PlayerService";
import LoadingComponent from "./Component/Layout/LoadingComponent";

function App() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<IPlayer | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSotedByGoals, setIsSortedByGoals] = useState(false);

  useEffect(() => {
    PlayersService.Players.lists().then((response) => {
      setPlayers(response);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isSotedByGoals) {
      const sortedPlayers = players.sort(
        (x, y) => y.goalsScored - x.goalsScored
      );
      setPlayers(sortedPlayers);
      setIsSubmitting(false);
    } else {
      const sortedPlayers = players.sort((x, y) => x.playerID - y.playerID);
      setPlayers(sortedPlayers);
      setIsSubmitting(false);
    }
  }, [isSotedByGoals]);

  const handleSelectPlayer = (id: number) => {
    setSelectedPlayer(players.find((x) => x.playerID === id));
    setEditMode(true);
    setAddMode(false);
    window.scrollTo(0, 0);
  };

  const hadndleCancelSelectedActivity = () => {
    setSelectedPlayer(undefined);
    setAddMode(false);
    setEditMode(false);
  };

  const handleFormOpen = (id?: number) => {
    id ? handleSelectPlayer(id) : setAddMode(true);
    setEditMode(false);
  };

  const handleCreatePlayer = (player: IPlayer) => {
    setIsSubmitting(true);
    PlayersService.Players.create(player).then(() => {
      setPlayers([...players, player]);
      console.log(player);
      setAddMode(false);
      setIsSubmitting(false);
    });
  };

  const handleEditPlayer = (player: IPlayer) => {
    setIsSubmitting(true);
    PlayersService.Players.update(player).then(() => {
      setPlayers([
        ...players.filter((x) => x.playerID !== player.playerID),
        player,
      ]);
      setEditMode(false);
      setIsSubmitting(false);
    });
  };

  const handleDeletePlayer = (id: number) => {
    setIsSubmitting(true);
    PlayersService.Players.delete(id).then(() => {
      setPlayers([...players.filter((x) => x.playerID !== id)]);
      setIsSubmitting(false);
    });
  };

  const handleSortByGoals = () => {
    setIsSubmitting(true);
    setIsSortedByGoals(true);
  };

  const handleResetOrder = () => {
    setIsSubmitting(true);
    setIsSortedByGoals(false);
  };

  if (loading)
    return <LoadingComponent inverted={false} content="Loading app.." />;

  return (
    players.length > 0 && (
      <>
        <NavBar openForm={handleFormOpen} />
        <Container style={{ marginTop: "7em" }}>
          {!isSotedByGoals ? (
            <Button
              loading={isSubmitting}
              positive
              onClick={() => handleSortByGoals()}
            >
              Sort by Goals Scored
            </Button>
          ) : (
            <Button
              loading={isSubmitting}
              positive
              onClick={() => handleResetOrder()}
            >
              Reset order
            </Button>
          )}
          <div className="ui hidden divider"></div>
          {players && players.length > 0 && (
            <Dashboard
              players={players}
              selectedPlayer={selectedPlayer}
              selectPlayer={handleSelectPlayer}
              cancelSelectActivity={hadndleCancelSelectedActivity}
              editMode={editMode}
              addMode={addMode}
              createPlayer={handleCreatePlayer}
              editPlayer={handleEditPlayer}
              deletePlayer={handleDeletePlayer}
              isSubmitting={isSubmitting}
            />
          )}
        </Container>
      </>
    )
  );
}

export default App;
