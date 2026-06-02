import VideoPlayer from "./VideoPlayer/videoPlayer";
import ShotChart from "./ShotChart/shotChart";
import TeamStats from "./TeamStats/teamStats";
import BoxScore from "./BoxScore/boxScore";
import { type Game } from "../../../../../types/game";

type GameStatsProps = {
  currentGame: Game;
};

export default function GameStats({ currentGame }: GameStatsProps) {
  console.log(currentGame + "waaaaa");

  if (!currentGame) return;

  if (currentGame.replay) {
    return (
      <div className="statsSection">
        <VideoPlayer videoUrl={currentGame.replay} />
        <ShotChart />
        <BoxScore currentGame={currentGame} />
        <TeamStats currentGame={currentGame} />
      </div>
    );
  }

  return (
    <div className="statsSection">
      <ShotChart />
      <BoxScore currentGame={currentGame} />
      <TeamStats currentGame={currentGame} />
    </div>
  );
}
