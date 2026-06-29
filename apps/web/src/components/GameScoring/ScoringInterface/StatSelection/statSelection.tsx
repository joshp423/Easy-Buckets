import "./statSelection.css";

type StatSelectionProps = {
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedStat: string;
  selectedPlayer: number | null;
};

export default function StatSelection({
  setSelectedStat,
  selectedStat,
  selectedPlayer,
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

  return (
    <div
      className={`statSelection ${selectedPlayer ? "spotlight" : "notSpotlightedMiddle"}`}
    >
      {statTypes.map((stat) => (
        <button
          onClick={() => setSelectedStat(stat)}
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
