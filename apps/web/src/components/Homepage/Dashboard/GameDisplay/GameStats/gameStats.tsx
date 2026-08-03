import VideoPlayer from "./VideoPlayer/videoPlayer";
import ShotChart from "./ShotChart/shotChart";
import BoxScore from "./BoxScore/boxScore";
import { type Game } from "../../../../../types/game";
import "./gameStats.css";
import type { ShotLog } from "../../../../../types/shotLog";
import { useState, useEffect } from "react";
import { getShotsAPIReq } from "../../../../../shared API functions/getShotsAPIReq";
import Shotlog from "../../../../GameScoring/ScoringInterface/ShotLog/shotLog";

type GameStatsProps = {
  currentGame: Game;
};

export default function GameStats({ currentGame }: GameStatsProps) {
  const [shotLog, setShotLog] = useState<ShotLog | null>(null);
  const [hoveredShotId, setHoveredShotId] = useState<number | null>(null); 

  useEffect(() => {
    const load = async () => {
      if (!currentGame) return;
      const shotLogData = await getShotsAPIReq(currentGame.id);
      if (shotLogData) setShotLog(shotLogData);
    };
    load();
  });
  if (!currentGame) return;

  if (currentGame.replay) {
    return (
      <div className="statsSection">
        <div className="replayChart">
          <VideoPlayer videoUrl={currentGame.replay} />
          <ShotChart shotLog={shotLog} hoveredShotId={hoveredShotId}/>
        </div>
        <Shotlog shotLog={shotLog} setHoveredShotId={setHoveredShotId}/>
        <BoxScore currentGame={currentGame} />
      </div>
    );
  }

  return (
    <div className="statsSection">
      <div className="noReplayChart">
        <ShotChart shotLog={shotLog} hoveredShotId={hoveredShotId}/>
      </div>
      <Shotlog shotLog={shotLog} setHoveredShotId={setHoveredShotId}/>
      <BoxScore currentGame={currentGame} />
    </div>
  );
}
