import { type Player } from "../../../../types/player";

type PlayerSelectionProps = {
  selectedPlayers: Player[];
};

export default function PlayerSelection({
  selectedPlayers,
}: PlayerSelectionProps) {
  return (
    <div className="playerSelection">
      {selectedPlayers.map((player) => (
        <button key={player.id}>
          {player.name} {player.number}
        </button>
      ))}
    </div>
  );
}
