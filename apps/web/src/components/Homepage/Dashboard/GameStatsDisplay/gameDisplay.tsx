import VideoPlayer from "./VideoPlayer/videoPlayer";
import ShotChart from "./ShotChart/shotChart";
import BoxScore from "./BoxScore/boxScore";
import TeamStats from "./TeamStats/teamStats";
import { type DashboardView } from "../../../../types/dashboardView";
import { type Season } from "../../../../types/season";

type GameStatsDisplayProps = {
  seasonData: Season
  dashboardView: DashboardView

}

export default function GameStatsDisplay({ game, stats, dashboardView, }: GameStatsDisplayProps) {
  

  
  return (
    <div className="statsSection">
      <VideoPlayer />
    </div>
  ) 
}
