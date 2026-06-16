import { type Player } from "../../../../types/player";

type PlayerSelectionProps = {
  selectedPlayers: Player[];
  setSelectedPlayer :React.Dispatch<React.SetStateAction<number | null>>
  selectedPlayer: number | null
};

export default function PlayerSelection({
  selectedPlayers,
  setSelectedPlayer,
  selectedPlayer,
}: PlayerSelectionProps) {
  return (
    <div className="playerSelection">
      {selectedPlayers.map((player) => (
        <button 
          key={player.id} 
          onClick={() => {setSelectedPlayer(player.id)}}
          style={selectedPlayer === player.id ? {"border" : "1px solid green"} : {} }
        >
          {player.name} {player.number}
        </button>
      ))}
    </div>
  );
}
