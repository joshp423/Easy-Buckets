import { updateGameStatAPIReq } from "../../../../../shared API functions/updateGameStatAPIReq";
import { getSingleGameAPIFetch } from "../../../../../shared API functions/getSingleGameAPIFetch";
import type { Game } from "../../../../../types/game";

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
  gameDetails: Game | null | "ready";
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null | "ready">>;
  selectedUI: "playerSelection" | "statSelection" | "courtPlacement";
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
  gameDetails,
  setGameDetails,
  selectedUI,
}: StatSelectionButtonProps) {
  return (
    <div>
      <h3>{sectionName}</h3>
      <div>
        {statArray.map((stat) => (
          <button
            onClick={async () => {
              if (!selectedPlayer) return;
              if (selectedStat === stat) {
                setSelectedStat("");
                setSelectedUI("statSelection");
                return;
              }
              setSelectedStat(stat);
              const courtStatCheck = courtPlacementStats.filter(
                (clickedStat) => clickedStat === stat,
              );
              if (courtStatCheck.length === 1) {
                setSelectedUI("courtPlacement");
                return;
              }
              if (!gameDetails || gameDetails === "ready") return;
              const selectedGameStatline = gameDetails.gameStatlines.filter(
                (gameStatline) => gameStatline.playerId === selectedPlayer,
              );
              console.log(selectedPlayer, stat);
              await updateGameStatAPIReq({
                gameStatlineId: selectedGameStatline[0]?.id,
                statlineUpdateField: stat,
                statlineUpdateIndicator: true,
              });
              const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
              if (updatedGame) setGameDetails(updatedGame);
              setSelectedUI("playerSelection");
              setSelectedPlayer(null);
              setSelectedStat("");
              return;
            }}
            style={{
              ...(selectedStat === stat
                ? { backgroundColor: "#e37204", color: "white" }
                : {}),
              ...(selectedUI === "statSelection" || selectedUI === "courtPlacement" ? { cursor: "pointer" } : {}),
            }}
            className={selectedUI === "statSelection" || selectedUI === "courtPlacement" ? "enableButtonHover" : ""}
          >
            {stat}
          </button>
        ))}
      </div>
    </div>
  );
}
