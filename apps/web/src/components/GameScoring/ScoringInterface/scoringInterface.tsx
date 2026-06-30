import type { Player } from "../../../types/player";
import PlayerSelection from "./PlayerSelection/playerSelection";
import { useState } from "react";
import StatSelection from "./StatSelection/statSelection";
import CourtInterface from "./CourtInterface/courtInterface";
import "./scoringInterface.css";
import type { Game } from "../../../types/game";
import VideoPlayer from "../../Homepage/Dashboard/GameDisplay/GameStats/VideoPlayer/videoPlayer";

type ScoringInterfaceProps = {
  selectedPlayers: Player[];
  gameDetails: Game;
};
//session storage for selectedPlayers
export default function ScoringInterface({
  selectedPlayers,
  gameDetails,
}: ScoringInterfaceProps) {
  const [selectedUI, setSelectedUI] = useState<
    "playerSelection" | "statSelection" | "courtPlacement"
  >("playerSelection");
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedStat, setSelectedStat] = useState<string>("");

  if (!gameDetails.replay) return (
    <div className="scoringInterface">
      <div className="interfaceInput">
        <PlayerSelection
          selectedPlayers={selectedPlayers}
          setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={selectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
        />
        <StatSelection
          setSelectedStat={setSelectedStat}
          selectedStat={selectedStat}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
        />
        <CourtInterface
          selectedStat={selectedStat}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
        />
      </div>
    </div>
  )

  return (
    <div className="scoringInterface">
      <VideoPlayer videoUrl={gameDetails.replay}/>
      <div className="interfaceInput">
        <PlayerSelection
          selectedPlayers={selectedPlayers}
          setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={selectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
        />
        <StatSelection
          setSelectedStat={setSelectedStat}
          selectedStat={selectedStat}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
        />
        <CourtInterface
          selectedStat={selectedStat}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
        />
      </div>
    </div>
  );
}
