import type { Player } from "../../../types/player";
import PlayerSelection from "./PlayerSelection/playerSelection";
import { useState } from "react";
import StatSelection from "./StatSelection/statSelection";
import CourtInterface from "./CourtInterface/courtInterface";
import "./scoringInterface.css";

type ScoringInterfaceProps = {
  selectedPlayers: Player[];
};
//session storage for selectedPlayers
export default function ScoringInterface({
  selectedPlayers,
}: ScoringInterfaceProps) {
  const [selectedUI, setSelectedUI] = useState<
    "playerSelection" | "statSelection" | "courtPlacement"
  >("playerSelection");
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [selectedStat, setSelectedStat] = useState<string>("");

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
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
        />
        <CourtInterface
          selectedStat={selectedStat}
          selectedPlayer={selectedPlayer}
          selectedUI={selectedUI}
          setSelectedUI={setSelectedUI}
        />
      </div>
    </div>
  );
}
