import { type Player } from "../../../../types/player";
import "./playerSelection.css";

type PlayerSelectionProps = {
  selectedPlayers: Player[];
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | null>>;
  selectedPlayer: number | null;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
};

export default function PlayerSelection({
  selectedPlayers,
  setSelectedPlayer,
  selectedPlayer,
  selectedUI,
  setSelectedUI,
}: PlayerSelectionProps) {

  function 
  return (
    <div
      className={`playerSelection ${
        switch(selectedUI) {
          case playerSelection": 
            "notSpotlightedLeft"
          break;
        } ? "notSpotlightedLeft" : "spotlightLeft"}
        
      `}
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
