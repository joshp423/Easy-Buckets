import VideoPlayer from "./VideoPlayer/videoPlayer";
import ShotChart from "./ShotChart/shotChart";
import BoxScore from "./BoxScore/boxScore";
import { type Game } from "../../../../../types/game";
import "./gameStats.css";


type GameStatsProps = {
  currentGame: Game;
};

export default function GameStats({ currentGame }: GameStatsProps) {
  console.log(currentGame + "waaaaa");

  if (!currentGame) return;

  if (currentGame.replay) {
    return (
      <div className="statsSection">
        <div className="replayChart">
          <VideoPlayer videoUrl={currentGame.replay} />
          <ShotChart />
        </div>
        <BoxScore currentGame={currentGame} />
      </div>
    );
  }

  return (
    <div className="statsSection">
      <div className="noReplayChart">
        <ShotChart />
      </div>
      <BoxScore currentGame={currentGame} />
    </div>
  );
}
