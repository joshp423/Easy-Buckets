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
  function addUIClasses(
    selectedUI: "playerSelection" | "statSelection" | "courtPlacement",
  ) {
    switch (selectedUI) {
      case "playerSelection":
        return "spotlight";
      case "statSelection":
        return "";
      case "courtPlacement":
        return "";
    }
  }
  return (
    <div className={`playerSelection ${addUIClasses(selectedUI)}`}>
      <h3>Select Player</h3>
      <div>
        {selectedPlayers.map((player) => (
          <button
            key={player.id}
            onClick={() => {
              if (selectedUI === "courtPlacement") return;
              if (selectedPlayer !== player.id) {
                setSelectedPlayer(player.id);
                setSelectedUI("statSelection");
                return;
              }
              setSelectedPlayer(null);
              setSelectedUI("playerSelection");
              return;
            }}
            style={{
              //spread copies over whatever comes out of the turnary to one object as style requires
              ...(selectedPlayer === player.id
                ? { backgroundColor: "#e37204", color: "white" }
                : {}),
              ...(selectedUI === "playerSelection" ||
              selectedUI === "statSelection"
                ? { cursor: "pointer" }
                : {}),
            }}
            className={selectedUI === "statSelection" || selectedUI === "playerSelection" ? "enableButtonHover" : ""}
          >
            {player.name} {player.number}
          </button>
        ))}
      </div>
    </div>
  );
}
