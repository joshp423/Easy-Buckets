import { updateGameStatAPIReq } from "../../../../../shared API functions/updateGameStatAPIReq";
import { getSingleGameAPIFetch } from "../../../../../shared API functions/getSingleGameAPIFetch";
import type { Game } from "../../../../../types/game";
import type { stackStat } from "../../scoringInterface";
import { useNavigate } from "react-router";

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
  undoStack: stackStat[];
  setUndoStack: React.Dispatch<React.SetStateAction<stackStat[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
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
  undoStack,
  setUndoStack,
  setLoading,
  loading,
}: StatSelectionButtonProps) {

  const navigate = useNavigate();
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

              setLoading(true);
              try {
                const rsp = await updateGameStatAPIReq({
                  gameStatlineId: selectedGameStatline[0]?.id,
                  statlineUpdateField: stat,
                  statlineUpdateIndicator: true,
                });

                if (!rsp) throw new Error;

                const newUndo = {
                  type: stat,
                  adding: true,
                  gameStatId: selectedGameStatline[0]?.id,
                };
                setUndoStack([...undoStack, newUndo]);

                const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
                if (!updatedGame) throw new Error;
                  
                setGameDetails(updatedGame);
                setSelectedUI("playerSelection");
                setSelectedPlayer(null);
                setSelectedStat("");
              } catch {
                navigate("/error", {
                  state: {
                    error: "An unexpected error occured, please try again later",
                  },
                });
              } finally {
                setLoading(false);
              }
            }}
            

            style={{
              ...(selectedStat === stat
                ? { backgroundColor: "#e37204", color: "white" }
                : {}),
              ...(selectedUI === "statSelection" ||
              selectedUI === "courtPlacement"
                ? { cursor: "pointer" }
                : {}),
            }}
            className={`${
              selectedUI === "statSelection" || selectedUI === "courtPlacement"
                ? "enableButtonHover"
                : ""
            } ${loading ? "loading" : ""}`}
          >
            {stat}
          </button>
        ))}
      </div>
    </div>
  );
}
