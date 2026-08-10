import "./statSelection.css";
import StatSelectionButton from "./statSelectionButton/statSelectionButton";
import type { Game } from "../../../../types/game";
import type { stackStat } from "../scoringInterface";

type StatSelectionProps = {
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedStat: string;
  selectedPlayer: number | null;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | null>>;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
  gameDetails: Game | null | "ready";
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null | "ready">>;
  undoStack: stackStat[];
  setUndoStack: React.Dispatch<React.SetStateAction<stackStat[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

export default function StatSelection({
  setSelectedStat,
  selectedStat,
  selectedPlayer,
  setSelectedPlayer,
  selectedUI,
  setSelectedUI,
  gameDetails,
  setGameDetails,
  undoStack,
  setUndoStack,
  setLoading,
  loading,
}: StatSelectionProps) {
  const pointsStats = [
    "2P Make",
    "2P Miss",
    "3P Make",
    "3P Miss",
    "FT Make",
    "FT Miss",
  ];

  const reboundingStats = ["O-Reb", "D-Reb"];

  const miscStats = ["Assist", "Block", "Steal", "TO", "Foul"];

  const courtPlacementStats = ["2P Make", "2P Miss", "3P Make", "3P Miss"];

  function addUIClasses(
    selectedUI: "playerSelection" | "statSelection" | "courtPlacement",
  ) {
    switch (selectedUI) {
      case "playerSelection":
        return "";
      case "statSelection":
        return "spotlight";
      case "courtPlacement":
        return "";
    }
  }

  return (
    <div
      className={`statSelection ${addUIClasses(selectedUI)} `}
      // className={`statSelection
      //   ${selectedPlayer ? "spotlightMiddle" : "notSpotlightedMiddle"}
      //   ${selectedStat && courtPlacementStats.filter(() => selectedStat) ? "courtSpotlightMiddle" : "notSpotlightedMiddle"})}`}
    >
      <StatSelectionButton
        gameDetails={gameDetails}
        setGameDetails={setGameDetails}
        statArray={pointsStats}
        sectionName={"Points"}
        selectedStat={selectedStat}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        setSelectedUI={setSelectedUI}
        selectedUI={selectedUI}
        setSelectedStat={setSelectedStat}
        courtPlacementStats={courtPlacementStats}
        undoStack={undoStack}
        setUndoStack={setUndoStack}
        setLoading={setLoading}
        loading={loading}
      />
      <StatSelectionButton
        gameDetails={gameDetails}
        setGameDetails={setGameDetails}
        statArray={reboundingStats}
        sectionName={"Rebounding"}
        selectedStat={selectedStat}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        setSelectedUI={setSelectedUI}
        selectedUI={selectedUI}
        setSelectedStat={setSelectedStat}
        courtPlacementStats={courtPlacementStats}
        undoStack={undoStack}
        setUndoStack={setUndoStack}
        setLoading={setLoading}
        loading={loading}
      />
      <StatSelectionButton
        gameDetails={gameDetails}
        setGameDetails={setGameDetails}
        statArray={miscStats}
        sectionName={"Misc"}
        selectedStat={selectedStat}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        setSelectedUI={setSelectedUI}
        selectedUI={selectedUI}
        setSelectedStat={setSelectedStat}
        courtPlacementStats={courtPlacementStats}
        undoStack={undoStack}
        setUndoStack={setUndoStack}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  );
}
