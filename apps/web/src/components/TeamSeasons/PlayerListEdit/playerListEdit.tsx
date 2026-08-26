import type { Player } from "../../../types/player";
import CreatePlayers from "../../GameScoring/CreatePlayers/createPlayers";
import EditPlayer from "./EditPlayer/editplayer";
import "./playerListEdit.css";

type PlayerListEditProps = {
  playerList: Player[];
  setAddPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  addPlayer: boolean;
  editPlayer: Player | null;
  setEditPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  editTeamPlayersToggle: boolean;
};

export default function PlayerListEdit({
  playerList,
  setAddPlayer,
  addPlayer,
  editPlayer,
  setEditPlayer,
  editTeamPlayersToggle,
}: PlayerListEditProps) {
  if (playerList.length === 0) return;

  if (editPlayer) {
    return (
      <div
        className="playerListEdit"
        style={
          editTeamPlayersToggle ? { display: "flex" } : { display: "none" }
        }
      >
        <EditPlayer editPlayer={editPlayer} setEditPlayer={setEditPlayer} />
      </div>
    );
  }
  if (addPlayer) {
    return (
      <div
        className="playerListEdit"
        style={
          editTeamPlayersToggle ? { display: "flex" } : { display: "none" }
        }
      >
        <CreatePlayers setAddPlayer={setAddPlayer} />
      </div>
    );
  }
  return (
    <div
      className="playerListEdit"
      style={editTeamPlayersToggle ? { display: "flex" } : { display: "none" }}
    >
      <h3>Players:</h3>
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
      <div className="addPlayer">
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
