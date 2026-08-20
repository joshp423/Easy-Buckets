import type { Player } from "../../../types/player";
import { useState } from "react";
import CreatePlayers from "../../GameScoring/CreatePlayers/createPlayers";
import EditPlayer from "./EditPlayer/editplayer";

type PlayerListEditProps = {
  playerList: Player[];
  setAddPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  addPlayer: boolean;
};

export default function PlayerListEdit({
  playerList,
  setAddPlayer,
  addPlayer,
}: PlayerListEditProps) {
  const [editPlayer, setEditPlayer] = useState<Player | null>(null);
  if (playerList.length === 0) return;

  if (editPlayer) {
    return <div className="playerListEdit"><EditPlayer editPlayer={editPlayer} setEditPlayer={setEditPlayer}/></div>;
  }
  if (addPlayer) {
    return (
      <div className="playerListEdit">
        <CreatePlayers setAddPlayer={setAddPlayer}/>
      </div>
    )
  }
  return (
    <div className="playerListEdit">
      <ul>
        {playerList.map((player) => (
          <li key={player.id}>
            <p>{player.name + " " + "#" + player.number}</p>
            <button
              type="button"
              onClick={() => {
                setEditPlayer(player);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          type="button"
          onClick={() => {
            setAddPlayer(true);
          }}
        >
          Add player
        </button>
      </div>
    </div>
  );
}
