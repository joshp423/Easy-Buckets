import type { Player } from "../../../types/player";
import PlayerSelection from "./PlayerSelection/playerSelection";

type ScoringInterfaceProps = {
  selectedPlayers: Player[];
};
//session storage for selectedPlayers
export default function ScoringInterface({
  selectedPlayers,
}: ScoringInterfaceProps) {
  return (
    <div className="scoringInterface">
      <div className="interfaceInput">
        <PlayerSelection selectedPlayers={selectedPlayers} />
      </div>
    </div>
  );
}
