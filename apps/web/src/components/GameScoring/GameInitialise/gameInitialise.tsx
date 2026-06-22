import NavSeasonSelector from "../../Homepage/Dashboard/Nav/NavSeasonSelector/navSeasonSelector";
import { type SeasonOverview } from "../../../types/seasonOverview";
import './gameInitialise.css'

type GameInitialiseProps = {
  teamSeasons: SeasonOverview[];
  setNewGameCheck: React.Dispatch<
    React.SetStateAction<"none" | "new" | "existing">
  >;
  setSelectedDashboardSeason: React.Dispatch<React.SetStateAction<string>>;
};

export default function GameInitialise({
  setNewGameCheck,
  teamSeasons,
  setSelectedDashboardSeason,
}: GameInitialiseProps) {
  return (
    <div className="gameInitialise">
      <div>
        <p>Season:</p>
        <NavSeasonSelector
          teamSeasons={teamSeasons}
          setSelectedDashboardSeason={setSelectedDashboardSeason}
        />
        </div>
      <div>
        <button
          onClick={() => {
            setNewGameCheck("new");
          }}
        >
          Score New Game
        </button>
        <button
          onClick={() => {
            setNewGameCheck("existing");
          }}
        >
          Continue From Draft
        </button>
      </div>
    </div>
  );
}
