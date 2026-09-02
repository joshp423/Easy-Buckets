import { type SyntheticEvent } from "react";
import { type Player } from "../../../types/player";
import CreatePlayers from "../CreatePlayers/createPlayers";
import "./selectActivePlayers.css";
import { createGameAndPlayerAPIRequest } from "../createGameAndPlayerAPIReq";
import { useNavigate } from "react-router";
import { type Game } from "../../../types/game";
import { useState } from "react";
import LoadingBall from "../../../assets/LoadingBall/loadingball";

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
  gameDetails: Game | null | "ready";
  selectedPlayers: Player[];
};

export default function SelectActivePlayers({
  selectedPlayers,
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
  gameDetails,
}: SelectActivePlayersProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function confirmPlayers(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!gameDetails) return;
    setLoading(true);
    const gameData = await createGameAndPlayerAPIRequest({
      e,
      seasonId: selectedSeasonId,
      opponent,
      date,
      replay,
      navigate,
      playerList: selectedPlayers,
    });
    if (!gameData) {
      navigate("/error", {
        state: {
          error: "An unexpected error occured, please try again later",
        },
      });
      setLoading(false);
      return;
    }
    setGameDetails(gameData);
    setReadyCheck(true);
    setLoading(false);
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

  if (addPlayer) return <CreatePlayers setAddPlayer={setAddPlayer} />;

  return (
    <div className="selectActivePlayers">
      <form onSubmit={confirmPlayers}>
        {playerList.length === 0 ? (
          <h1>No Active Players</h1>
        ) : ( <h1>Select Active Players</h1> )}
        <table>
        {playerList.length === 0 ? "" : (<thead>
            <tr>
              <th>Player</th>
              <th>Active?</th>
            </tr>
          </thead>
        )}
          <tbody>
            {playerList.map((player) => (
              <tr key={player.id}>
                <td>
                  <label htmlFor={String(player.id)}>
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
            Add Player
          </button>
          <button type="submit">{loading ? <LoadingBall /> : "Submit"}</button>
        </div>
      </form>
      <button onClick={() => setGameDetails(null)}>Back</button>
    </div>
  );
}
