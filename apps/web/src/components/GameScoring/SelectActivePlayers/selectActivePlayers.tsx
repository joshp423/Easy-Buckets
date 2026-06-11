import { useState } from "react";
import type { Player } from "../../../types/player";
import { useNavigate } from "react-router";
import CreatePlayers from "../CreatePlayers/createPlayers";

type SelectActivePlayersProps = {
  playerList: Player[];
};

export default function SelectActivePlayers({
  playerList,
}: SelectActivePlayersProps) {
  const [addPlayer, setAddPlayer] = useState<boolean>(false);
  const navigate = useNavigate();

  console.log(playerList);
  if (!playerList) return;
  if (addPlayer) {
    return <CreatePlayers />;
  }

  return (
    <div className="selectActivePlayers">
      <form>
        <h1>Select Active Players</h1>
        {playerList.map((player) => (
          <div>
            <input
              type="checkbox"
              id={String(player.id)}
              name={String(player.id)}
              value={player.id}
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
