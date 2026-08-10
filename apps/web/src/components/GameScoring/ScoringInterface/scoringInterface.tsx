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
import { publishGameAPIReq } from "./publishGameAPIReq";
import { useNavigate } from "react-router";

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
  const [selectedShot, setSelectedShot] = useState<number | null>(null);
  const [undoStack, setUndoStack] = useState<stackStat[]>([]);
  const [redoStack, setRedoStack] = useState<redoStat[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      if (gameDetails === "ready" || !gameDetails) return;
      const gamePlayers = gameDetails?.gameStatlines.map(
        (gameStatline) => gameStatline.player,
      );
      if (!gamePlayers) return;
      setSelectedPlayers(gamePlayers);
      const shotLogData = await getShotsAPIReq(gameDetails.id);
      if (shotLogData) setShotLog(shotLogData);
      setLoading(false);
    };
    load();
  }, [gameDetails, setGameDetails, setSelectedPlayers, undoStack]);

  if (gameDetails === "ready" || !gameDetails) return;

  if (!gameDetails.replay)
    return (
      <div className={`scoringInterface ${loading ? "loading" : ""}`}>
        <div className="undoRedo">
          <button
            onClick={async () => {
              setLoading(true);
              await undoLast(
                shotLog,
                undoStack,
                setUndoStack,
                redoStack,
                setRedoStack,
              );
              const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
              if (updatedGame) setGameDetails(updatedGame);
              setLoading(false);
            }}
            className={`${undoStack.length === 0 ? "disabled" : "enabled"} ${loading ? "loading" : ""}`}
          >
            Undo
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              await redoLast(undoStack, setUndoStack, redoStack, setRedoStack);
              const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
              if (updatedGame) setGameDetails(updatedGame);
              setLoading(false);
            }}
            className={`${redoStack.length === 0 ? "disabled" : "enabled"} ${loading ? "loading" : ""}`}
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
                setLoading={setLoading}
                loading={loading}
              />
            </div>
            <Shotlog
              shotLog={shotLog}
              selectedShot={selectedShot}
              setSelectedShot={setSelectedShot}
              replay={false}
              videoRef={videoRef}
            />
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
            selectedShot={selectedShot}
            undoStack={undoStack}
            setUndoStack={setUndoStack}
            setLoading={setLoading}
            loading={loading}
          />
        </div>
        <ScoringBoxScore gameDetails={gameDetails} />
        <button
          onClick={async () => {
            const updatedGame = await publishGameAPIReq(gameDetails.id);
            if (updatedGame) {
              navigate("/");
              return;
            }
            return;
          }}
        >
          Finish Scoring Game
        </button>
      </div>
    );

  return (
    <div className={`scoringInterface ${loading ? "loading" : ""}`}>
      <VideoPlayer videoUrl={gameDetails.replay} ref={videoRef} />
      <div className="undoRedo">
        <button
          onClick={async () => {
            setLoading(true);
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
            setLoading(false);
          }}
          className={`${undoStack.length === 0 ? "disabled" : "enabled"} ${loading ? "loading" : ""}`}
        >
          Undo
        </button>
        <button
          onClick={async () => {
            setLoading(true);
            await redoLast(undoStack, setUndoStack, redoStack, setRedoStack);
            console.log(redoStack[0]);
            const updatedGame = await getSingleGameAPIFetch(gameDetails.id);
            if (updatedGame) setGameDetails(updatedGame);
            setLoading(false);
          }}
          className={`${redoStack.length === 0 ? "disabled" : "enabled"} ${loading ? "loading" : ""}`}
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
              setLoading={setLoading}
              loading={loading}
            />
          </div>
          <Shotlog
            shotLog={shotLog}
            selectedShot={selectedShot}
            setSelectedShot={setSelectedShot}
            replay={true}
            videoRef={videoRef}
          />
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
          selectedShot={selectedShot}
          undoStack={undoStack}
          setUndoStack={setUndoStack}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
      <ScoringBoxScore gameDetails={gameDetails} />
      <button
        onClick={async () => {
          const updatedGame = await publishGameAPIReq(gameDetails.id);
          if (updatedGame) {
            navigate("/");
            return;
          }
          return;
        }}
      >
        Finish Scoring Game
      </button>
    </div>
  );
}
