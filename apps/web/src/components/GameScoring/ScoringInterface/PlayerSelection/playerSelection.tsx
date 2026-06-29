import { type Player } from "../../../../types/player";
import "./playerSelection.css";

type PlayerSelectionProps = {
  selectedPlayers: Player[];
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | null>>;
  selectedPlayer: number | null;
};

export default function PlayerSelection({
  selectedPlayers,
  setSelectedPlayer,
  selectedPlayer,
}: PlayerSelectionProps) {
  return (
    <div
      className={`playerSelection ${selectedPlayer ? "notSpotlightedLeft" : "spotlightLeft"}`}
    >
      {selectedPlayers.map((player) => (
        <button
          key={player.id}
          onClick={() => {
            if (selectedPlayer !== player.id) {
              setSelectedPlayer(player.id);
              return;
            }
            setSelectedPlayer(null);
            return;
          }}
          style={
            selectedPlayer === player.id
              ? { backgroundColor: "#e37204", color: "white" }
              : {}
          }
        >
          {player.name} {player.number}
        </button>
      ))}
    </div>
  );
}
