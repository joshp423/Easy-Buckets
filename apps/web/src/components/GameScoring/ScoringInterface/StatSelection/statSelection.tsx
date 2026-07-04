import "./statSelection.css";
import StatSelectionButton from "./statSelectionButton/statSelectionButton";

type StatSelectionProps = {
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedStat: string;
  selectedPlayer: number | null;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | null>>;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
};

export default function StatSelection({
  setSelectedStat,
  selectedStat,
  selectedPlayer,
  setSelectedPlayer,
  selectedUI,
  setSelectedUI,
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

  const courtPlacementStats = [
    "2P Make",
    "2P Miss",
    "3P Make",
    "3P Miss",
  ];

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
        statArray={pointsStats}
        sectionName={"Points"}
        selectedStat={selectedStat}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        setSelectedUI={setSelectedUI}
        setSelectedStat={setSelectedStat}
        courtPlacementStats={courtPlacementStats}
      />
      <StatSelectionButton
        statArray={reboundingStats}
        sectionName={"Rebounding"}
        selectedStat={selectedStat}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        setSelectedUI={setSelectedUI}
        setSelectedStat={setSelectedStat}
        courtPlacementStats={courtPlacementStats}
      />
      <StatSelectionButton
        statArray={miscStats}
        sectionName={"Misc"}
        selectedStat={selectedStat}
        selectedPlayer={selectedPlayer}
        setSelectedPlayer={setSelectedPlayer}
        setSelectedUI={setSelectedUI}
        setSelectedStat={setSelectedStat}
        courtPlacementStats={courtPlacementStats}
      />
    </div>
  );
}
