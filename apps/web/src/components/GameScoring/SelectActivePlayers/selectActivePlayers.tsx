import { type SyntheticEvent } from "react";
import { type Player } from "../../../types/player";
import CreatePlayers from "../CreatePlayers/createPlayers";
import "./selectActivePlayers.css";
import { createGameAndPlayerAPIRequest } from "../createGameAndPlayerAPIReq";
import { useNavigate } from "react-router";
import { type Game } from "../../../types/game";

type SelectActivePlayersProps = {
  selectedSeasonId: number | null;
  playerList: Player[];
  setReadyCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setAddPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  addPlayer: boolean;
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  opponent: string;
  date: string;
  replay: string | null;
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null | "ready">>;
  gameDetails: Game | null | "ready"
};

export default function SelectActivePlayers({
  selectedSeasonId,
  playerList,
  setReadyCheck,
  setAddPlayer,
  addPlayer,
  setSelectedPlayers,
  opponent,
  date,
  replay,
  setGameDetails,
  gameDetails
}: SelectActivePlayersProps) {
  async function confirmPlayers(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(gameDetails)
    if (!gameDetails) return;

    const gameData = createGameAndPlayerAPIRequest({
      e,
      seasonId: selectedSeasonId,
      opponent,
      date,
      replay,
      navigate,
      playerList,
    })
    setGameDetails(await gameData);
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

  const navigate = useNavigate();

  if (!playerList) return;

  if (addPlayer) {
    return <CreatePlayers setAddPlayer={setAddPlayer} />;
  }

  return (
    <div className="selectActivePlayers">
      <form onSubmit={confirmPlayers}>
        <h1>Select Active Players</h1>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Active?</th>
            </tr>
          </thead>

          <tbody>
            {playerList.map((player) => (
              <tr key={player.id}>
                <td>
                  <label htmlFor={String(player.number)}>
                    {player.name + " " + player.number}
                  </label>
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={String(player.id)}
                    name={String(player.id)}
                    value={player.id}
                    onChange={(e) => {
                      updateSelectedPlayers(player, e.target.checked);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button
            type="button"
            onClick={() => {
              setAddPlayer(true);
            }}
          >
            Add player
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
