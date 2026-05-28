import VideoPlayer from "./VideoPlayer/videoPlayer";
import ShotChart from "./ShotChart/shotChart";
import TeamStats from "./TeamStats/teamStats";
import BoxScore from "./BoxScore/boxScore";
import { type Game } from "../../../../../types/game";

type GameStatsProps = {
  seasonData: Game[] | null;
  currentGame: Game;
};

export default function GameStats({ seasonData, currentGame }: GameStatsProps) {
  return (
    <div className="statsSection">
      <VideoPlayer />
      <ShotChart />
      <BoxScore />
      <TeamStats />
    </div>
  );
}
