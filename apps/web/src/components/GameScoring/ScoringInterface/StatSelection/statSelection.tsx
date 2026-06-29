import "./statSelection.css";

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
  const statTypes = [
    "Two Point Make",
    "Two Point Miss",
    "Three Point Make",
    "Three Point Miss",
    "Free Throw Make",
    "Free Throw Miss",
    "Offensive Rebound",
    "Defensive Rebound",
    "Assist",
    "Block",
    "Steal",
    "Turnover",
    "Foul",
  ];

  const courtPlacementStats = [
    "Two Point Make",
    "Two Point Miss",
    "Three Point Make",
    "Three Point Miss",
  ];

  function addUIClasses(
    selectedUI: "playerSelection" | "statSelection" | "courtPlacement",
  ) {
    switch (selectedUI) {
      case "playerSelection":
        return "notSpotlightedMiddle";
      case "statSelection":
        return "spotlightMiddle";
      case "courtPlacement":
        return "courtSpotlightMiddle";
    }
  }

  return (
    <div
      className={`playerSelection ${addUIClasses(selectedUI)} `}
      // className={`statSelection
      //   ${selectedPlayer ? "spotlightMiddle" : "notSpotlightedMiddle"}
      //   ${selectedStat && courtPlacementStats.filter(() => selectedStat) ? "courtSpotlightMiddle" : "notSpotlightedMiddle"})}`}
    >
      {statTypes.map((stat) => (
        <button
          onClick={() => {
            if (!selectedPlayer) return;
            if (selectedStat === stat) {
              setSelectedStat("");
              setSelectedUI("statSelection");
              return;
            }
            setSelectedStat(stat);
            console.log(selectedStat);
            const courtStatCheck = courtPlacementStats.filter(
              (clickedStat) => clickedStat === stat,
            );
            if (courtStatCheck.length === 1) {
              setSelectedUI("courtPlacement");
              return;
            }
            //send stat
            // setSelectedStat("")
            setSelectedUI("playerSelection");
            setSelectedPlayer(null);
            return;
          }}
          style={
            selectedStat === stat
              ? { backgroundColor: "#e37204", color: "white" }
              : {}
          }
        >
          {stat}
        </button>
      ))}
    </div>
  );
}
