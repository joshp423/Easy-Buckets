import "./statSelection.css";

type StatSelectionProps = {
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedStat: string;
  selectedPlayer: number | null;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
};

export default function StatSelection({
  setSelectedStat,
  selectedStat,
  selectedPlayer,
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

  return (
    <div
      className={`statSelection 
        ${selectedPlayer ? "spotlightMiddle" : "notSpotlightedMiddle"}
        ${selectedStat && courtPlacementStats.filter(() => selectedStat) ? "courtSpotlightMiddle" : "notSpotlightedMiddle"})}`}
    >
      {statTypes.map((stat) => (
        <button
          onClick={() => {
            if (!selectedPlayer) return;
            if (selectedStat === stat) {
              setSelectedStat("");
              return;
            }
            setSelectedStat(stat);
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
