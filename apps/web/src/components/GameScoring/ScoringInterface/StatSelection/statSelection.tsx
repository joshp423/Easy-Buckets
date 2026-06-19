type StatSelectionProps = {
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedStat: string;
};

export default function StatSelection({
  setSelectedStat,
  selectedStat,
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
    <div className="statSelection">
      {statTypes.map((stat) => (
        <button
          onClick={() => setSelectedStat(stat)}
          style={selectedStat === stat ? { border: "1px solid green" } : {}}
        >
          {stat}
        </button>
      ))}
    </div>
  );
}
