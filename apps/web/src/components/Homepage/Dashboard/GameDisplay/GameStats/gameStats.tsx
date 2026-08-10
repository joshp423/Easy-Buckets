import VideoPlayer from "./VideoPlayer/videoPlayer";
import ShotChart from "./ShotChart/shotChart";
import BoxScore from "./BoxScore/boxScore";
import { type Game } from "../../../../../types/game";
import "./gameStats.css";
import type { ShotLog } from "../../../../../types/shotLog";
import { useState, useEffect, useRef } from "react";
import { getShotsAPIReq } from "../../../../../shared API functions/getShotsAPIReq";
import Shotlog from "../../../../GameScoring/ScoringInterface/ShotLog/shotLog";
import type { VideoPlayerHandle } from "./VideoPlayer/videoPlayer";

type GameStatsProps = {
  currentGame: Game;
};

export default function GameStats({ currentGame }: GameStatsProps) {
  const [shotLog, setShotLog] = useState<ShotLog | null>(null);
  const [selectedShot, setSelectedShot] = useState<number | null>(null);
  const videoRef = useRef<VideoPlayerHandle>(null);

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
          <VideoPlayer videoUrl={currentGame.replay} ref={videoRef} />
          <ShotChart shotLog={shotLog} selectedShot={selectedShot} />
        </div>
        <Shotlog
          shotLog={shotLog}
          selectedShot={selectedShot}
          setSelectedShot={setSelectedShot}
          replay={true}
          videoRef={videoRef}
        />
        <BoxScore currentGame={currentGame} />
      </div>
    );
  }

  return (
    <div className="statsSection">
      <div className="noReplayChart">
        <ShotChart shotLog={shotLog} selectedShot={selectedShot} />
      </div>
      <Shotlog
        shotLog={shotLog}
        selectedShot={selectedShot}
        setSelectedShot={setSelectedShot}
        replay={false}
        videoRef={videoRef}
      />
      <BoxScore currentGame={currentGame} />
    </div>
  );
}
