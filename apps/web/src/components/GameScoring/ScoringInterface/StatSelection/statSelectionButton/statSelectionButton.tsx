type StatSelectionButtonProps = {
  statArray: string[];
  sectionName: string;
  selectedPlayer: number | null;
  setSelectedStat: React.Dispatch<React.SetStateAction<string>>;
  selectedStat: string;
  setSelectedPlayer: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedUI: React.Dispatch<
    React.SetStateAction<"playerSelection" | "statSelection" | "courtPlacement">
  >;
  courtPlacementStats: string[];
};

export default function StatSelectionButton({
  statArray,
  sectionName,
  selectedStat,
  selectedPlayer,
  setSelectedPlayer,
  setSelectedUI,
  setSelectedStat,
  courtPlacementStats,
}: StatSelectionButtonProps) {
  return (
    <div>
      <h3>{sectionName}</h3>
      <div>
        {statArray.map((stat) => (
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
              setSelectedStat("")
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
    </div>
  );
}
