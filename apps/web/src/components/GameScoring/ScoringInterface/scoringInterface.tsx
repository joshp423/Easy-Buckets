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
import { getSingleGameAPIFetch } from "./getSingleGameAPIFetch";

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

  // function uploadStat(statType: string) {
  //   console.log(statType);
  //   let timeStamp;
  //   switch (statType) {
  //     case "2P Make":
  //       timeStamp = videoRef.current?.getCurrentTimestamp() ?? 0;
  //       console.log(timeStamp);
  //   }
  // }

  useEffect(() => {
    const load = async () => {
      if (gameDetails === "ready") return;
      const gamePlayers = gameDetails?.gameStatlines.map(
        (gameStatline) => gameStatline.player,
      );
      if (!gamePlayers) return;
      setSelectedPlayers(gamePlayers);
    };
    load();
  }, [gameDetails, setGameDetails, setSelectedPlayers]);

  if (gameDetails === "ready" || !gameDetails) return;

  if (!gameDetails.replay)
    return (
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
            setSelectedStat={setSelectedStat}
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
            selectedUI={selectedUI}
            setSelectedUI={setSelectedUI}
            videoRef={videoRef}
          />
        </div>
      </div>
    );

  return (
    <div className="scoringInterface">
      <VideoPlayer videoUrl={gameDetails.replay} ref={videoRef} />
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
              setSelectedStat={setSelectedStat}
              selectedStat={selectedStat}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
              selectedUI={selectedUI}
              setSelectedUI={setSelectedUI}
            />
          </div>
          <div className="shotLog"></div>
        </div>
        <CourtInterface
          selectedStat={selectedStat}
          setSelectedStat={setSelectedStat}
          selectedPlayer={selectedPlayer}
          setSelectedPlayer={setSelectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
          gameDetails={gameDetails}
        />
      </div>
    </div>
  );
}
