import type { Player } from "../../../types/player";
import PlayerSelection from "./PlayerSelection/playerSelection";
import { useState } from "react";

type ScoringInterfaceProps = {
  selectedPlayers: Player[];
};
//session storage for selectedPlayers
export default function ScoringInterface({
  selectedPlayers,
}: ScoringInterfaceProps) {

  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null)
  return (
    <div className="scoringInterface">
      <div className="interfaceInput">
        <PlayerSelection selectedPlayers={selectedPlayers} setSelectedPlayer={setSelectedPlayer} selectedPlayer={selectedPlayer}/>

      </div>
    </div>
  );
}
