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

  return (
    <div className="statsSection">
      <VideoPlayer />
      <ShotChart />
      <BoxScore gameStats={currentGame} />
      <TeamStats />
    </div>
  );
}
