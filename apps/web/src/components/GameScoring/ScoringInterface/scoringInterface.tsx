import type { Player } from "../../../types/player";
import PlayerSelection from "./PlayerSelection/playerSelection";
import { useEffect, useRef, useState } from "react";
import StatSelection from "./StatSelection/statSelection";
import CourtInterface from "./CourtInterface/courtInterface";
// import "./scoringInterface.css";
import "./scoringInterfaceB.css";
import type { Game } from "../../../types/game";
import VideoPlayer, {
  type VideoPlayerHandle,
} from "../../Homepage/Dashboard/GameDisplay/GameStats/VideoPlayer/videoPlayer";
import ScoringBoxScore from "./ScoringBoxScore/scoringBoxScore";
import Shotlog from "./ShotLog/shotLog";
import { getShotsAPIReq } from "../../../shared API functions/getShotsAPIReq";
import type { ShotLog } from "../../../types/shotLog";
import undoLast from "./undoLast";
import { getSingleGameAPIFetch } from "../../../shared API functions/getSingleGameAPIFetch";
import type { Shot } from "../../../types/shot";
import redoLast from "./redoLast";

type ScoringInterfaceProps = {
  setGameDetails: React.Dispatch<React.SetStateAction<Game | null | "ready">>;
  selectedPlayers: Player[];
  gameDetails: Game | null | "ready";
  setSelectedPlayers: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        number: number;
      }[]
    >
  >;
};

export type stackStat = {
  type: string;
  adding: boolean;
  gameStatId: number;
};

export type redoStat = {
  type: string;
  adding: boolean;
  gameStatId: number;
  shotInfo: Shot;
};

//session storage for selectedPlayers
export default function ScoringInterface({
  setGameDetails,
  setSelectedPlayers,
  selectedPlayers,
  gameDetails,
}: ScoringInterfaceProps) {
  const [selectedUI, setSelectedUI] = useState<
    "playerSelection" | "statSelection" | "courtPlacement"
  >("playerSelection");
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedStat, setSelectedStat] = useState<string>("");
  const videoRef = useRef<VideoPlayerHandle>(null);
  const [shotLog, setShotLog] = useState<ShotLog | null>(null);
  const [hoveredShotId, setHoveredShotId] = useState<number | null>(null);
  const [undoStack, setUndoStack] = useState<stackStat[]>([]);
  const [redoStack, setRedoStack] = useState<redoStat[]>([]);

  useEffect(() => {
    const load = async () => {
      if (gameDetails === "ready" || !gameDetails) return;
      const gamePlayers = gameDetails?.gameStatlines.map(
        (gameStatline) => gameStatline.player,
      );
      if (!gamePlayers) return;
      setSelectedPlayers(gamePlayers);
      const shotLogData = await getShotsAPIReq(gameDetails.id);
      if (shotLogData) setShotLog(shotLogData);
    };
    load();
  }, [gameDetails, setGameDetails, setSelectedPlayers, undoStack]);

  if (gameDetails === "ready" || !gameDetails) return;

  if (!gameDetails.replay)
    return (
      <div className="scoringInterface">
        <div className="undoRedo">
          <button
            onClick={async () => {
              await undoLast(
                shotLog,
                undoStack,
                setUndoStack,
                redoStack,
                setRedoStack,
              );
              const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
              if (updatedGame) setGameDetails(updatedGame);
            }}
            className={undoStack.length === 0 ? "disabled" : "enabled"}
          >
            Undo
          </button>
          <button
            onClick={async () => {
              await redoLast(undoStack, setUndoStack, redoStack, setRedoStack);
              const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
              if (updatedGame) setGameDetails(updatedGame);
            }}
            className={redoStack.length === 0 ? "disabled" : "enabled"}
          >
            Redo
          </button>
        </div>
        <div className="interfaceInput">
          <div>
            <div className="selectionSections">
              <PlayerSelection
                selectedPlayers={selectedPlayers}
                setSelectedPlayer={setSelectedPlayer}
                selectedPlayer={selectedPlayer}
                selectedUI={selectedUI}
                setSelectedUI={setSelectedUI}
              />
              <StatSelection
                gameDetails={gameDetails}
                setGameDetails={setGameDetails}
                setSelectedStat={setSelectedStat}
                selectedStat={selectedStat}
                selectedPlayer={selectedPlayer}
                setSelectedPlayer={setSelectedPlayer}
                selectedUI={selectedUI}
                setSelectedUI={setSelectedUI}
                undoStack={undoStack}
                setUndoStack={setUndoStack}
              />
            </div>
            <Shotlog shotLog={shotLog} setHoveredShotId={setHoveredShotId} />
          </div>
          <CourtInterface
            selectedStat={selectedStat}
            setSelectedStat={setSelectedStat}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
            selectedUI={selectedUI}
            setSelectedUI={setSelectedUI}
            videoRef={videoRef}
            gameDetails={gameDetails}
            setGameDetails={setGameDetails}
            shotLog={shotLog}
            hoveredShotId={hoveredShotId}
            undoStack={undoStack}
            setUndoStack={setUndoStack}
          />
        </div>
        <ScoringBoxScore gameDetails={gameDetails} />
      </div>
    );

  return (
    <div className="scoringInterface">
      <VideoPlayer videoUrl={gameDetails.replay} ref={videoRef} />
      <div className="undoRedo">
        <button
          onClick={async () => {
            await undoLast(
              shotLog,
              undoStack,
              setUndoStack,
              redoStack,
              setRedoStack,
            );
            console.log(undoStack[0]);
            const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
            if (updatedGame) setGameDetails(updatedGame);
          }}
          className={undoStack.length === 0 ? "disabled" : "enabled"}
        >
          Undo
        </button>
        <button
          onClick={async () => {
            await redoLast(undoStack, setUndoStack, redoStack, setRedoStack);
            console.log(redoStack[0]);
            const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
            if (updatedGame) setGameDetails(updatedGame);
          }}
          className={redoStack.length === 0 ? "disabled" : "enabled"}
        >
          Redo
        </button>
      </div>
      <div className="interfaceInput">
        <div>
          <div className="selectionSections">
            <PlayerSelection
              selectedPlayers={selectedPlayers}
              setSelectedPlayer={setSelectedPlayer}
              selectedPlayer={selectedPlayer}
              selectedUI={selectedUI}
              setSelectedUI={setSelectedUI}
            />
            <StatSelection
              gameDetails={gameDetails}
              setGameDetails={setGameDetails}
              setSelectedStat={setSelectedStat}
              selectedStat={selectedStat}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              selectedUI={selectedUI}
              setSelectedUI={setSelectedUI}
              undoStack={undoStack}
              setUndoStack={setUndoStack}
            />
          </div>
          <Shotlog shotLog={shotLog} setHoveredShotId={setHoveredShotId} />
        </div>
        <CourtInterface
          selectedStat={selectedStat}
          setSelectedStat={setSelectedStat}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
          videoRef={videoRef}
          gameDetails={gameDetails}
          setGameDetails={setGameDetails}
          shotLog={shotLog}
          hoveredShotId={hoveredShotId}
          undoStack={undoStack}
          setUndoStack={setUndoStack}
        />
      </div>
      <ScoringBoxScore gameDetails={gameDetails} />
      {/* <button 
        onClick={(e) => {

        }}
      >Finish Scoring Game</button> */}
    </div>
  );
}
