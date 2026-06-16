type StatSelectionProps = {
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedStat: string;
};

export default function StatSelection({
  setSelectedStat,
  selectedStat,
}: StatSelectionProps) {
  const statTypes = [
    "twoPointFGMiss",
    "twoPointFGMake",
    "twoPointFGA",
    "threePointFGMiss",
    "threePointFGMake",
    "threePointFGA",
    "fTMiss",
    "fTMake",
    "fTA",
    "oReb",
    "dReb",
    "assist",
    "block",
    "steal",
    "turnover",
    "pF",
    "totalRebounds",
    "points",
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
