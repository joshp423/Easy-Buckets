import { type SyntheticEvent } from "react";
import { type Player } from "../../../types/player";
import CreatePlayers from "../CreatePlayers/createPlayers";

type SelectActivePlayersProps = {
  playerList: Player[];
  setReadyCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  addPlayer: boolean;
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
};

export default function SelectActivePlayers({
  playerList,
  setReadyCheck,
  setAddPlayer,
  addPlayer,
  setSelectedPlayers,
}: SelectActivePlayersProps) {
  function confirmPlayers(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setReadyCheck(true);
  }

  const updateSelectedPlayers = (player: Player, selected: boolean) => {
    if (selected) {
      setSelectedPlayers((prev) => [...prev, player]);
      return;
    }
    setSelectedPlayers((prev) =>
      prev.filter((selectedPlayer) => selectedPlayer.id !== player.id),
    ); //filters to records where selectedPlayer.id !== player.id, removing the selected
    return;
  };

  if (!playerList) return;

  if (addPlayer) {
    return <CreatePlayers setAddPlayer={setAddPlayer} />;
  }

  return (
    <div className="selectActivePlayers">
      <form onSubmit={confirmPlayers}>
        <h1>Select Active Players</h1>
        {playerList.map((player) => (
          <div key={player.id}>
            <input
              type="checkbox"
              id={String(player.id)}
              name={String(player.id)}
              value={player.id}
              onChange={(e) => {
                updateSelectedPlayers(player, e.target.checked);
              }}
            />
            <label htmlFor={String(player.number)}>
              {player.name + " " + player.number}
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            setAddPlayer(true);
          }}
        >
          Add player
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
